import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { importSource, modules } from './helpers/importSource.mjs';

const { createTitleMotion } = await importSource(
  '../src/hero/transition/titleTransitionFrame.ts',
);

test('title and globe reach measured endpoints, restore the hero on reversal, and reveal the section', () => {
  const geometry = {
    text: 'Web presence',
    fromX: 400,
    fromY: 180,
    toX: 100,
    toY: 120,
    middleX: 200,
    middleY: 600,
    middleScale: 1.9,
    width: 380,
    fontSize: 40,
    lineHeight: 48,
    weight: 600,
    spacing: -1.4,
    targetScale: 1.6,
    globeFromX: 800,
    globeFromY: 500,
    globeToX: 50,
    globeToY: 110,
    globeMiddleX: 400,
    globeMiddleY: 240,
    globeMiddleScale: 8,
    globeSize: 56,
    globeScale: 52 / 56,
  };
  const start = createTitleMotion(geometry, 0, false);
  assert.equal(start.frame.text, 'Web presence');
  assert.equal(start.moving, false);
  assert.equal(start.frame.x, geometry.fromX);
  assert.equal(start.frame.y, geometry.fromY);
  assert.equal(start.frame.heroExit, 0);
  assert.equal(start.frame.reveal, 0);
  const middle = createTitleMotion(geometry, 0.5, false);
  assert.equal(middle.moving, true);
  assert.equal(middle.frame.complete, false);
  assert.equal(middle.frame.heroExit, 1);
  assert.equal(middle.frame.x, geometry.middleX);
  const returning = createTitleMotion(geometry, 0.5, true);
  assert.equal(returning.moving, false);
  assert.equal(returning.frame.complete, true);
  assert.equal(returning.frame.heroExit, 0);
  const end = createTitleMotion(geometry, 1, false);
  assert.equal(end.frame.x, geometry.toX);
  assert.equal(end.frame.y, geometry.toY);
  assert.equal(end.frame.scale, geometry.targetScale);
  assert.equal(end.frame.globe.x, geometry.globeToX);
  assert.equal(end.frame.globe.y, geometry.globeToY);
  assert.equal(end.frame.complete, true);
  assert.equal(end.frame.reveal, 1);
});

test('title transition reverses before completion and resets only at its start after completion', async () => {
  const source = await readFile(
    new URL(
      '../src/hero/transition/useTitleTransitionMotion.ts',
      import.meta.url,
    ),
    'utf8',
  );
  const handlers = new Map();
  let scheduled;
  let motion;
  let cleanup;
  globalThis.__titleMotionTest = {
    useState: () => [
      null,
      (value) => {
        motion = value;
      },
    ],
    useLayoutEffect: (effect) => {
      cleanup = effect();
    },
    measureTitleGeometry: () => ({ start: 100, end: 1100 }),
  };
  globalThis.window = {
    scrollY: 0,
    addEventListener: (name, handler) => handlers.set(name, handler),
    removeEventListener: (name) => handlers.delete(name),
  };
  globalThis.document = {
    body: {},
    getElementById: () => null,
    fonts: { ready: Promise.resolve() },
  };
  globalThis.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  globalThis.requestAnimationFrame = (callback) => {
    scheduled = callback;
    return 1;
  };
  globalThis.cancelAnimationFrame = () => {
    scheduled = undefined;
  };
  try {
    let code = ts
      .transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
        },
      })
      .outputText.replace(
        /import .* from 'react';/,
        'const { useLayoutEffect, useState } = globalThis.__titleMotionTest;',
      )
      .replace(
        /import .* from '.\/titleTransitionGeometry';/,
        'const { measureTitleGeometry } = globalThis.__titleMotionTest;',
      );
    for (const match of [...code.matchAll(/from ['"](\.[^'"]+)['"]/g)]) {
      const dependency = new URL(
        `${match[1]}.ts`,
        new URL(
          '../src/hero/transition/useTitleTransitionMotion.ts',
          import.meta.url,
        ),
      );
      await importSource(dependency.href);
      code = code.replace(match[0], `from '${modules.get(dependency.href)}'`);
    }
    const { default: useMotion } = await import(
      `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
    );
    useMotion(false);
    const scrollTo = (y) => {
      window.scrollY = y;
      handlers.get('scroll')();
      const callback = scheduled;
      scheduled = undefined;
      callback();
      return motion;
    };
    scrollTo(600);
    const reversed = scrollTo(400);
    assert.equal(reversed.moving, true);
    assert.equal(reversed.frame.complete, false);
    assert.equal(reversed.frame.progress, 0.3);
    assert.equal(scrollTo(800).moving, true);
    assert.equal(scrollTo(1100).frame.complete, true);
    assert.equal(scrollTo(600).moving, false);
    assert.equal(scrollTo(800).moving, false);
    assert.equal(scrollTo(101).moving, false);
    scrollTo(99);
    assert.equal(scrollTo(400).moving, true);
    assert.equal(scrollTo(200).moving, true);
  } finally {
    cleanup?.();
    for (const key of [
      '__titleMotionTest',
      'window',
      'document',
      'ResizeObserver',
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ])
      delete globalThis[key];
  }
});
