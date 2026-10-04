import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

test('cached navbar geometry follows the sticky hero through its containing scene', async () => {
  const { heroOverlapsViewport } = await importSource(
    '../src/navigation/navbarGeometry.ts',
  );
  const geometry = {
    pageHeight: 6000,
    sceneStart: 0,
    sceneEnd: 1575,
    heroHeight: 900,
    stickyTop: 0,
    sticky: true,
  };
  assert.equal(heroOverlapsViewport(0, 900, geometry), true);
  assert.equal(heroOverlapsViewport(900, 900, geometry), true);
  assert.equal(heroOverlapsViewport(1574, 900, geometry), true);
  assert.equal(heroOverlapsViewport(1575, 900, geometry), false);
  const tall = {
    ...geometry,
    heroHeight: 1200,
    sceneEnd: 1875,
    stickyTop: -300,
  };
  assert.equal(heroOverlapsViewport(1874, 900, tall), true);
  assert.equal(heroOverlapsViewport(1875, 900, tall), false);
  assert.equal(
    heroOverlapsViewport(1200, 900, { ...tall, sticky: false }),
    false,
  );
});
