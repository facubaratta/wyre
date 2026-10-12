import { BRAND_STOPS } from '../brand/colors';
import {
  connectionReach,
  createMeshConnections,
  createMeshNodes,
  meshRibbonPoint,
  updateMeshPositions,
  type MeshNode,
  type MeshPointer,
  type MeshPosition,
} from './meshGeometry';

export function createMeshRenderer(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  let brandGradient: CanvasGradient;
  // Cache soft light and fine grain rather than blurring on every frame.
  const glowSprite = document.createElement('canvas');
  glowSprite.width = glowSprite.height = 128;
  const glowContext = glowSprite.getContext('2d');
  if (glowContext) {
    const glow = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
    glow.addColorStop(0, 'rgba(255,255,255,1)');
    glow.addColorStop(0.08, 'rgba(255,255,255,0.7)');
    glow.addColorStop(0.25, 'rgba(255,255,255,0.18)');
    glow.addColorStop(0.55, 'rgba(255,255,255,0.035)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    glowContext.fillStyle = glow;
    glowContext.fillRect(0, 0, 128, 128);
  }
  const dust = document.createElement('canvas');
  const dustContext = dust.getContext('2d');
  let bokeh: { x: number; y: number; radius: number; phase: number }[] = [];
  let width = 0,
    height = 0;
  let reach = 0;
  let connections: [number, number][] = [];
  let positions: MeshPosition[] = [];
  let nodes: MeshNode[] = [];
  const light = (x: number, y: number, radius: number, opacity: number) => {
    ctx.globalAlpha = opacity;
    ctx.drawImage(glowSprite, x - radius, y - radius, radius * 2, radius * 2);
  };
  const draw = (time: number, pointer: MeshPointer) => {
    ctx.clearRect(0, 0, width, height);
    updateMeshPositions(nodes, positions, time, pointer);
    // Wide, low-intensity light gives the strand volume without a flat wash.
    for (let i = 0; i < 5; i++) {
      const point = meshRibbonPoint(width, height, 0.35 + i * 0.16, 0);
      light(point.x, point.y, Math.min(width, height) * 0.48, 0.09);
    }
    ctx.globalAlpha = 0.8;
    ctx.drawImage(
      dust,
      Math.sin(time * 0.12) * 6,
      Math.cos(time * 0.1) * 5,
      width,
      height,
    );
    for (const particle of bokeh) {
      const x = particle.x + Math.sin(time * 0.11 + particle.phase) * 12;
      const y = particle.y + Math.cos(time * 0.09 + particle.phase) * 15;
      light(x, y, particle.radius * 2.8, 0.1);
      ctx.globalAlpha = 0.035;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    for (const [i, j] of connections) {
      const a = positions[i],
        b = positions[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared > reach * reach) continue;
      const distance = Math.sqrt(distanceSquared);
      const influence = Math.max(a.influence, b.influence);
      const depth = Math.min(a.depth, b.depth);
      ctx.strokeStyle = `rgba(255,255,255,${(1 - distance / reach) * (0.09 + influence * 0.28) * depth})`;
      ctx.lineWidth = 0.45 + influence * 0.4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    positions.forEach((node, index) => {
      const focal = index % 9 === 0;
      const pulse = 0.85 + Math.sin(time * 0.6 + nodes[index].phase) * 0.15;
      const radius = (focal ? 2 : 0.55) + node.depth * 0.65 + node.influence;
      light(
        node.x,
        node.y,
        radius * (focal ? 14 : 7),
        (focal ? 0.6 : 0.2) * pulse + node.influence * 0.25,
      );
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(255,255,255,${(focal ? 0.9 : 0.25 + node.depth * 0.3) * pulse})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
      if (focal) {
        // Restrained diffraction spikes only on the few points in focus.
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * pulse})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(node.x - radius * 5, node.y);
        ctx.lineTo(node.x + radius * 5, node.y);
        ctx.moveTo(node.x, node.y - radius * 7);
        ctx.lineTo(node.x, node.y + radius * 7);
        ctx.stroke();
      }
    });
    // All light inherits the exact existing purple/pink/peach brand gradient.
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = brandGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  };
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    brandGradient = ctx.createLinearGradient(0, 0, width, height * 0.4);
    BRAND_STOPS.forEach(({ offset, color }) =>
      brandGradient.addColorStop(offset, color),
    );
    nodes = createMeshNodes(width, height);
    positions = nodes.map((node) => ({ ...node, influence: 0 }));
    reach = connectionReach(width);
    connections = createMeshConnections(nodes, reach);
    dust.width = canvas.width;
    dust.height = canvas.height;
    let seed = 137;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    if (dustContext) {
      dustContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(2800, Math.round((width * height) / 450));
      for (let i = 0; i < count; i++) {
        const progress = random();
        const offset = (random() - 0.5) * 2;
        const point = meshRibbonPoint(width, height, progress, offset);
        const radius = 0.25 + random() * 0.65;
        dustContext.fillStyle = `rgba(255,255,255,${(0.12 + random() * 0.45) * (1 - Math.abs(offset) * 0.65)})`;
        dustContext.beginPath();
        dustContext.arc(point.x, point.y, radius, 0, Math.PI * 2);
        dustContext.fill();
      }
    }
    bokeh = Array.from({ length: width < 640 ? 12 : 24 }, () => ({
      ...meshRibbonPoint(width, height, random(), (random() - 0.5) * 5),
      radius: 4 + random() * 17,
      phase: random() * Math.PI * 2,
    }));
  };

  return { draw, resize };
}
