export type MeshNode = { x: number; y: number; phase: number; depth: number };
export type MeshPosition = {
  x: number;
  y: number;
  influence: number;
  depth: number;
};
export type MeshPointer = { x: number; y: number; strength: number };

export const connectionReach = (width: number) => (width < 640 ? 115 : 165);

export function createMeshNodes(width: number, height: number): MeshNode[] {
  const count = Math.min(
    190,
    Math.max(45, Math.round((width * height) / 8500)),
  );
  let seed = 73;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, index) => {
    const ribbon = index % 5 !== 0;
    const point = ribbon
      ? meshRibbonPoint(width, height, random(), (random() - 0.5) * 2)
      : { x: random() * width, y: random() * height };
    return {
      ...point,
      phase: random() * Math.PI * 2,
      depth: 0.3 + random() * 0.7,
    };
  });
}

/** A sweeping strand leaves the upper-left content area quiet. */
export function meshRibbonPoint(
  width: number,
  height: number,
  progress: number,
  offset: number,
) {
  const sweep = Math.sin(progress * 8.5 + 0.4);
  return {
    x: progress * (width + 100) - 50,
    y:
      height * (1.12 - progress * 0.87 + sweep * 0.085) +
      offset * height * (0.045 + progress * 0.075),
  };
}

export function updateMeshPositions(
  nodes: MeshNode[],
  positions: MeshPosition[],
  time: number,
  pointer: MeshPointer,
) {
  nodes.forEach((node, index) => {
    const x = node.x + Math.sin(time * 0.23 + node.phase) * 24 * node.depth;
    const y =
      node.y + Math.cos(time * 0.19 + node.phase * 1.3) * 30 * node.depth;
    const dx = pointer.x - x,
      dy = pointer.y - y;
    const influence =
      Math.max(0, 1 - Math.hypot(dx, dy) / 260) * pointer.strength;
    const position = positions[index];
    position.x = x + dx * influence * 0.16;
    position.y = y + dy * influence * 0.16;
    position.influence = influence;
  });
}

export function createMeshConnections(
  nodes: MeshNode[],
  reach: number,
): [number, number][] {
  // Drift is at most hypot(24, 30); pointer attraction is at most 260 * .16 / 4.
  // A pair beyond this bound can never connect, even as both nodes move.
  const maximumDistance = reach + 2 * (Math.hypot(24, 30) + (260 * 0.16) / 4);
  const limit = maximumDistance * maximumDistance;
  const connections: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x,
        dy = nodes[i].y - nodes[j].y;
      if (dx * dx + dy * dy <= limit) connections.push([i, j]);
    }
  }
  return connections;
}
