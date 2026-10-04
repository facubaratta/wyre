import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

const mesh = await importSource('../src/background/meshGeometry.ts');

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
