import { useLayoutEffect, useState } from 'react';
import { clamp } from '../../scroll/scrollTimeline';
import { createTitleMotion } from './titleTransitionFrame';
import { measureTitleGeometry } from './titleTransitionGeometry';
import type { TitleMotion } from './TitleTransitionContext';

const idleMotion: TitleMotion = { moving: false, frame: null };

export default function useTitleTransitionMotion(
  reduceMotion: boolean,
): TitleMotion {
  const [motion, setMotion] = useState(idleMotion);
  useLayoutEffect(() => {
    if (reduceMotion) return;
    let animationFrame = 0;
    let disposed = false;
    let previousProgress = -1;
    let previousY = Math.max(0, window.scrollY);
    let scrollingUp = false;
    let returningToHero = false;
    let geometryChanged = true;
    let geometry: ReturnType<typeof measureTitleGeometry>;
    const render = () => {
      animationFrame = 0;
      if (!geometry) geometry = measureTitleGeometry();
      if (!geometry) return;
      const y = Math.max(0, window.scrollY);
      const wasScrollingUp = scrollingUp;
      const wasReturningToHero = returningToHero;
      if (y !== previousY) scrollingUp = y < previousY;
      if (scrollingUp) returningToHero = true;
      if (y <= geometry.start) returningToHero = false;
      previousY = y;
      const progress = clamp(
        (y - geometry.start) / (geometry.end - geometry.start),
      );
      if (
        progress === previousProgress &&
        scrollingUp === wasScrollingUp &&
        returningToHero === wasReturningToHero &&
        !geometryChanged
      )
        return;
      previousProgress = progress;
      geometryChanged = false;
      setMotion(createTitleMotion(geometry, progress, returningToHero));
    };
    const schedule = () => {
      if (!animationFrame && !disposed)
        animationFrame = requestAnimationFrame(render);
    };
    const refresh = () => {
      geometryChanged = true;
      geometry = undefined;
      schedule();
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    const header = document.getElementById('site-header');
    if (header) observer.observe(header);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', refresh);
    void document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', refresh);
    };
  }, [reduceMotion]);

  return reduceMotion ? idleMotion : motion;
}
