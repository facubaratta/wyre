import { useEffect, useState } from 'react';
import { REDUCED_MOTION_QUERY } from './gridConfig';

export function useGridClock() {
  const [time, setTime] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    let frame: number | null = null;
    let previousTime: number | null = null;
    let elapsed = 0;

    const tick = (now: number) => {
      if (previousTime !== null) elapsed += (now - previousTime) / 1000;
      previousTime = now;
      setTime(elapsed);
      frame = requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      setReducedMotion(media.matches);
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
      if (!media.matches && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    syncAnimation();
    media.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      media.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, []);

  return { time, reducedMotion };
}
