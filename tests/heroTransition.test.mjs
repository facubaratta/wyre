import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { importSource, modules } from './helpers/importSource.mjs';

const { createHeroMotion } = await importSource(
  '../src/hero/transition/heroTransitionFrame.ts',
);

test('hero sinks away and restores when returning', () => {
  const start = createHeroMotion(0, false);
  assert.equal(start.moving, false);
  assert.equal(start.frame.progress, 0);
  const middle = createHeroMotion(0.5, false);
  assert.equal(middle.moving, true);
  assert.equal(middle.frame.complete, false);
  assert.equal(middle.frame.progress, 0.5);
  const returning = createHeroMotion(0.5, true);
  assert.equal(returning.moving, false);
  assert.equal(returning.frame.complete, true);
  assert.equal(returning.frame.progress, 0);
  const end = createHeroMotion(1, false);
  assert.equal(end.frame.progress, 1);
  assert.equal(end.frame.complete, true);
});

test('hero transition reverses before completion and resets only at its start after completion', async () => {
  const source = await readFile(
    new URL(
      '../src/hero/transition/useHeroTransitionMotion.ts',
      import.meta.url,
    ),
    'utf8',
  );
  const handlers = new Map();
  let scheduled;
  let motion;
  let renders = 0;
  let cleanup;
  globalThis.__heroMotionTest = {
    useState: () => [
      null,
      (value) => {
        motion = value;
        renders++;
      },
    ],
    useLayoutEffect: (effect) => {
      cleanup = effect();
    },
    measureHeroGeometry: () => ({ start: 100, end: 1100 }),
    getWindowScroll: () => ({ y: window.scrollY }),
    subscribeWindowScroll: (callback) => {
      const handler = () => requestAnimationFrame(callback);
      window.addEventListener('scroll', handler);
      return () => window.removeEventListener('scroll', handler);
    },
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
        'const { useLayoutEffect, useState } = globalThis.__heroMotionTest;',
      )
      .replace(
        /import .* from '.\/heroTransitionGeometry';/,
        'const { measureHeroGeometry } = globalThis.__heroMotionTest;',
      )
      .replace(
        /import .* from '..\/..\/scroll\/windowScrollStore';/,
        'const { getWindowScroll, subscribeWindowScroll } = globalThis.__heroMotionTest;',
      );
    for (const match of [...code.matchAll(/from ['"](\.[^'"]+)['"]/g)]) {
      const dependency = new URL(
        `${match[1]}.ts`,
        new URL(
          '../src/hero/transition/useHeroTransitionMotion.ts',
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
    const stableRenders = renders;
    const reversed = scrollTo(400);
    assert.equal(renders, stableRenders);
    assert.equal(reversed.moving, true);
    assert.equal(reversed.frame.complete, false);
    assert.equal(reversed.frame.pastHero, false);
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
      '__heroMotionTest',
      'window',
      'document',
      'ResizeObserver',
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ])
      delete globalThis[key];
  }
});
