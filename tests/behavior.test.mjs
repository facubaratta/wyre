import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Compile the real pure modules in memory; no test framework or generated files.
const modules = new Map();
async function importSource(relativePath) {
  const path = new URL(relativePath, import.meta.url);
  const load = async (url) => {
    if (modules.has(url.href)) return modules.get(url.href);
    const source = await readFile(url, 'utf8');
    let code = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText;
    for (const match of [...code.matchAll(/from ['"](\.[^'"]+)['"]/g)]) {
      const dependency = new URL(`${match[1]}.ts`, url);
      code = code.replace(match[0], `from '${await load(dependency)}'`);
    }
    const compiled = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
    modules.set(url.href, compiled);
    return compiled;
  };
  return import(await load(path));
}

const mesh = await importSource('../src/background/meshGeometry.ts');
const { createTimeline } = await importSource(
  '../src/scroll/scrollTimeline.ts',
);
const { getPortfolioStage } = await importSource(
  '../src/portfolio/portfolioSequence.ts',
);
const { createTitleMotion } = await importSource(
  '../src/hero/transition/titleTransitionFrame.ts',
);

test('mesh pruning preserves every visible connection across viewport sizes and pointer movement', () => {
  for (const [width, height] of [
    [390, 844],
    [640, 500],
    [1440, 900],
    [2560, 1440],
  ]) {
    const nodes = mesh.createMeshNodes(width, height);
    const reach = mesh.connectionReach(width);
    const candidates = mesh.createMeshConnections(nodes, reach);
    const positions = nodes.map((node) => ({ ...node, influence: 0 }));
    for (let step = 0; step < 80; step++) {
      mesh.updateMeshPositions(nodes, positions, step * 1.37, {
        x: width * ((step % 11) / 10),
        y: height * ((step % 7) / 6),
        strength: (step % 3) / 2,
      });
      const connected = (i, j) => {
        const dx = positions[i].x - positions[j].x,
          dy = positions[i].y - positions[j].y;
        return dx * dx + dy * dy <= reach * reach;
      };
      const exhaustive = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (connected(i, j)) exhaustive.push([i, j]);
        }
      }
      assert.deepEqual(
        candidates.filter(([i, j]) => connected(i, j)),
        exhaustive,
      );
    }
  }
});

test('portfolio keeps the first project until entrance and preserves project/closing boundaries', () => {
  for (const introScreens of [0, 3.75, 7.25]) {
    const timeline = createTimeline(5, introScreens);
    assert.equal(getPortfolioStage(0, 5, timeline), 0);
    assert.equal(
      getPortfolioStage(timeline.projectsStart - 0.01, 5, timeline),
      0,
    );
    for (let index = 0; index < 5; index++) {
      assert.equal(
        getPortfolioStage(timeline.projectsStart + index + 0.01, 5, timeline),
        index,
      );
      assert.equal(
        getPortfolioStage(timeline.projectsStart + index + 0.99, 5, timeline),
        index,
      );
    }
    assert.equal(
      getPortfolioStage(timeline.closingStart + 0.49, 5, timeline),
      4,
    );
    assert.equal(
      getPortfolioStage(timeline.closingStart + 0.5, 5, timeline),
      5,
    );
    assert.equal(getPortfolioStage(timeline.closingEnd + 10, 5, timeline), 5);
  }
});

test('title and globe reach measured endpoints, restore the hero on reversal, and reveal the section', () => {
  const geometry = {
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

test('scroll store shares listeners, batches events, preserves unchanged snapshots, and cleans up', async () => {
  const handlers = new Map(),
    frames = new Map();
  let sequence = 0,
    additions = 0,
    removals = 0;
  globalThis.window = {
    scrollY: 0,
    innerHeight: 844,
    addEventListener: (name, handler) => {
      additions++;
      handlers.set(name, handler);
    },
    removeEventListener: (name) => {
      removals++;
      handlers.delete(name);
    },
  };
  globalThis.requestAnimationFrame = (callback) => {
    const id = ++sequence;
    frames.set(id, callback);
    return id;
  };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  const { getWindowScroll, subscribeWindowScroll } = await importSource(
    '../src/scroll/windowScrollStore.ts',
  );
  let firstCalls = 0,
    secondCalls = 0;
  const first = subscribeWindowScroll(() => firstCalls++);
  const second = subscribeWindowScroll(() => secondCalls++);
  assert.equal(additions, 2);
  const initial = getWindowScroll();
  handlers.get('scroll')();
  handlers.get('scroll')();
  handlers.get('resize')();
  assert.equal(frames.size, 1);
  const flush = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback());
  };
  flush();
  assert.equal(getWindowScroll(), initial);
  assert.equal(firstCalls, 0);
  window.scrollY = 400;
  handlers.get('scroll')();
  flush();
  assert.deepEqual(getWindowScroll(), { y: 400, viewport: 844 });
  assert.equal(firstCalls, 1);
  assert.equal(secondCalls, 1);
  first();
  assert.equal(removals, 0);
  window.innerHeight = 0;
  handlers.get('resize')();
  flush();
  assert.equal(getWindowScroll().viewport, 1);
  handlers.get('scroll')();
  second();
  assert.equal(removals, 2);
  assert.equal(frames.size, 0);
  window.scrollY = 900;
  const stop = subscribeWindowScroll(() => {});
  assert.equal(getWindowScroll().y, 900);
  stop();
  delete globalThis.window;
  delete globalThis.requestAnimationFrame;
  delete globalThis.cancelAnimationFrame;
});

test('every runtime source module is reachable from the application entry point', async () => {
  const { readdir } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const { join } = await import('node:path');
  const root = fileURLToPath(new URL('../src/', import.meta.url));
  const files = [];
  const collect = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await collect(path);
      else if (/\.tsx?$/.test(path) && !path.endsWith('.d.ts'))
        files.push(path);
    }
  };
  await collect(root);
  const reached = new Set();
  const visit = async (path) => {
    if (reached.has(path)) return;
    reached.add(path);
    const source = ts.createSourceFile(
      path,
      await readFile(path, 'utf8'),
      ts.ScriptTarget.Latest,
    );
    for (const statement of source.statements) {
      if (
        !ts.isImportDeclaration(statement) &&
        !ts.isExportDeclaration(statement)
      )
        continue;
      const specifier = statement.moduleSpecifier;
      if (
        !specifier ||
        !ts.isStringLiteral(specifier) ||
        !specifier.text.startsWith('.')
      )
        continue;
      const { resolvedModule } = ts.resolveModuleName(
        specifier.text,
        path,
        {
          moduleResolution: ts.ModuleResolutionKind.Bundler,
        },
        ts.sys,
      );
      if (resolvedModule && files.includes(resolvedModule.resolvedFileName))
        await visit(resolvedModule.resolvedFileName);
    }
  };
  await visit(join(root, 'main.tsx'));
  assert.deepEqual(
    files.filter((path) => !reached.has(path)),
    [],
  );
});
