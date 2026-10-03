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
  return Array.from({ length: count }, () => ({
    x: random() * (width + 80) - 40,
    y: random() * (height + 80) - 40,
    phase: random() * Math.PI * 2,
    depth: 0.3 + random() * 0.7,
  }));
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
