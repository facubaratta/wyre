import { useEffect, useRef } from 'react';
import { createMeshRenderer } from './createMeshRenderer';

/** Animation and pointer state stay outside React's render cycle. */
export function useDigitalMesh(reduceMotion: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const renderer = createMeshRenderer(canvas, ctx);
    let frame = 0,
      time = 0,
      previousTime = 0,
      lastDrawTime = 0;
    const frameInterval = 1000 / 60;
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      strength: 0,
    };
    const resize = () => {
      renderer.resize();
      renderer.draw(time, pointer);
    };
    const animate = (timestamp: number) => {
      frame = requestAnimationFrame(animate);
      const elapsed = timestamp - lastDrawTime;
      if (previousTime && elapsed < frameInterval - 0.1) return;
      // Carry fractional time forward to keep a steady cadence across refresh rates.
      lastDrawTime = previousTime
        ? lastDrawTime +
          Math.floor((elapsed + 0.1) / frameInterval) * frameInterval
        : timestamp;
      const delta = previousTime
        ? Math.min((timestamp - previousTime) / 1000, 0.05)
        : 0;
      previousTime = timestamp;
      time += delta;
      const smoothing = 1 - Math.exp(-delta * 7);
      pointer.x += (pointer.targetX - pointer.x) * smoothing;
      pointer.y += (pointer.targetY - pointer.y) * smoothing;
      pointer.strength +=
        ((pointer.active ? 1 : 0) - pointer.strength) * smoothing;
      renderer.draw(time, pointer);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (!pointer.active) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    };
    const leave = () => {
      pointer.active = false;
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      lastDrawTime = 0;
      if (!document.hidden && !reduceMotion)
        frame = requestAnimationFrame(animate);
    };
    resize();
    window.addEventListener('resize', resize);
    if (!reduceMotion) {
      if (!document.hidden) frame = requestAnimationFrame(animate);
      window.addEventListener('pointermove', move, { passive: true });
      document.documentElement.addEventListener('pointerleave', leave);
      window.addEventListener('blur', leave);
      document.addEventListener('visibilitychange', visibility);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reduceMotion]);
  return canvasRef;
}
