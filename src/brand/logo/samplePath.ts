type Point = { x: number; y: number };

/** Sample once at setup; animation frames interpolate without reading SVG layout. */
export function samplePath(
  path: { getPointAtLength(distance: number): Point },
  length: number,
) {
  const steps = Math.max(1, Math.ceil(length / 2));
  const points = Array.from({ length: steps + 1 }, (_, i) =>
    path.getPointAtLength((length * i) / steps),
  );
  return (distance: number): Point => {
    const position =
      length > 0
        ? Math.max(0, Math.min(steps, (distance / length) * steps))
        : 0;
    const index = Math.min(steps - 1, Math.floor(position));
    const fraction = position - index;
    const from = points[index];
    const to = points[index + 1];
    return {
      x: from.x + (to.x - from.x) * fraction,
      y: from.y + (to.y - from.y) * fraction,
    };
  };
}
