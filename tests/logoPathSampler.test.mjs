import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

const { samplePath } = await importSource('../src/brand/logo/samplePath.ts');

test('cached logo paths preserve endpoints and curved motion without further SVG reads', () => {
  const radius = 7;
  const length = (Math.PI * radius) / 2;
  let reads = 0;
  const path = {
    getPointAtLength(distance) {
      reads++;
      return {
        x: radius * Math.cos(distance / radius),
        y: radius * Math.sin(distance / radius),
      };
    },
  };
  const point = samplePath(path, length);
  const setupReads = reads;
  assert.deepEqual(point(-1), { x: radius, y: 0 });
  assert.ok(Math.abs(point(length + 1).y - radius) < 1e-10);
  for (let distance = 0; distance <= length; distance += 0.1) {
    const actual = point(distance);
    assert.ok(
      Math.hypot(
        actual.x - radius * Math.cos(distance / radius),
        actual.y - radius * Math.sin(distance / radius),
      ) < 0.07,
    );
  }
  assert.equal(reads, setupReads);
});
