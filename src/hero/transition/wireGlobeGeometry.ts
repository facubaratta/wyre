const TAU = Math.PI * 2;
const tilt = -Math.PI / 8;
const tiltSin = Math.sin(tilt);
const tiltCos = Math.cos(tilt);

type Point3D = { x: number; y: number; z: number };
const spherePoint = (latitude: number, longitude: number): Point3D => ({
  x: Math.cos(latitude) * Math.sin(longitude),
  y: Math.sin(latitude),
  z: Math.cos(latitude) * Math.cos(longitude),
});
// Sample the sphere once; frames only rotate these immutable coordinates.
const lines = [
  ...Array.from({ length: 12 }, (_, index) =>
    Array.from({ length: 81 }, (_, step) =>
      spherePoint(-Math.PI / 2 + (Math.PI * step) / 80, (TAU * index) / 12),
    ),
  ),
  ...Array.from({ length: 7 }, (_, index) =>
    Array.from({ length: 121 }, (_, step) =>
      spherePoint(
        -Math.PI / 2 + (Math.PI * (index + 1)) / 8,
        (TAU * step) / 120,
      ),
    ),
  ),
];
const anchors = [
  [-0.2, 0.45],
  [0.55, 2.2],
  [-0.65, 4.7],
].map(([latitude, longitude]) => spherePoint(latitude, longitude));

export function wireGlobeGeometry(rotation: number) {
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  const project = (point: Point3D) => {
    const x = point.x * cos + point.z * sin;
    const z = point.z * cos - point.x * sin;
    return {
      x: 100 + x * 79,
      y: 100 - (point.y * tiltCos - z * tiltSin) * 79,
      front: point.y * tiltSin + z * tiltCos >= 0,
    };
  };
  const paths = lines.map((points) => {
    let front = '',
      back = '';
    let previousFront: boolean | undefined;
    for (const point of points) {
      const projected = project(point);
      const command = `${previousFront === projected.front ? 'L' : 'M'}${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
      if (projected.front) front += command;
      else back += command;
      previousFront = projected.front;
    }
    return { front, back };
  });
  return { paths, anchors: anchors.map(project) };
}
