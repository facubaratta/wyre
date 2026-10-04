import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

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
