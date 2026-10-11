import { BRAND_STOPS } from '../brand/colors';
import {
  connectionReach,
  createMeshConnections,
  createMeshNodes,
  updateMeshPositions,
  type MeshNode,
  type MeshPointer,
  type MeshPosition,
} from './meshGeometry';

export function createMeshRenderer(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  const rgb = '255,255,255';
  const lightRgb = rgb;
  let brandGradient: CanvasGradient;
  const glowSprite = document.createElement('canvas');
  glowSprite.width = glowSprite.height = 64;
  const glowContext = glowSprite.getContext('2d');
  if (glowContext) {
    const glow = glowContext.createRadialGradient(32, 32, 0, 32, 32, 32);
    glow.addColorStop(0, `rgba(${rgb},1)`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    glowContext.fillStyle = glow;
    glowContext.fillRect(0, 0, 64, 64);
  }
  let width = 0,
    height = 0;
  let reach = 0;
  let connections: [number, number][] = [];
  let positions: MeshPosition[] = [];
  let nodes: MeshNode[] = [];
  const draw = (time: number, pointer: MeshPointer) => {
    ctx.clearRect(0, 0, width, height);
    updateMeshPositions(nodes, positions, time, pointer);
    for (const [i, j] of connections) {
      const a = positions[i],
        b = positions[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared > reach * reach) continue;
      const distance = Math.sqrt(distanceSquared);
      const light = Math.max(a.influence, b.influence);
      ctx.strokeStyle = `rgba(${rgb},${(1 - distance / reach) * (0.16 + light * 0.38)})`;
      ctx.lineWidth = 0.6 + light * 0.4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (const node of positions) {
      const radius = 0.7 + node.depth * 0.7 + node.influence;
      ctx.globalAlpha = 0.16 + node.influence * 0.3;
      ctx.drawImage(
        glowSprite,
        node.x - radius * 6,
        node.y - radius * 6,
        radius * 12,
        radius * 12,
      );
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${lightRgb},${0.3 + node.depth * 0.25 + node.influence * 0.4})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    // Tint the existing mesh alpha once; geometry and pointer behavior stay intact.
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
    positions = nodes.map((node) => ({
      x: node.x,
      y: node.y,
      depth: node.depth,
      influence: 0,
    }));
    reach = connectionReach(width);
    connections = createMeshConnections(nodes, reach);
  };

  return { draw, resize };
}
