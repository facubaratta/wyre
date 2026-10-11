import { useLayoutEffect, useState } from 'react';
import { createHeroMotion, getHeroProgress } from './heroTransitionFrame';
import {
  getWindowScroll,
  subscribeWindowScroll,
} from '../../scroll/windowScrollStore';
import { measureHeroGeometry } from './heroTransitionGeometry';
import type { HeroMotion } from './HeroTransitionContext';

const idleMotion: HeroMotion = { moving: false, frame: null };

export default function useHeroTransitionMotion(
  reduceMotion: boolean,
): HeroMotion {
  const [motion, setMotion] = useState(idleMotion);
  useLayoutEffect(() => {
    if (reduceMotion) return;
    let animationFrame = 0;
    let disposed = false;
    let previousMotion = idleMotion;
    let completed = false;
    let returningToHero = false;
    let geometry: ReturnType<typeof measureHeroGeometry>;
    const render = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (disposed) return;
      if (!geometry) geometry = measureHeroGeometry();
      if (!geometry) return;
      const y = Math.max(0, getWindowScroll().y);
      const progress = getHeroProgress(geometry, y);
      if (y <= geometry.start) completed = false;
      else if (progress === 1) completed = true;
      returningToHero = completed && progress < 1;
      const next = createHeroMotion(progress, returningToHero);
      if (
        next.moving === previousMotion.moving &&
        next.frame?.progress === previousMotion.frame?.progress &&
        next.frame?.complete === previousMotion.frame?.complete &&
        next.frame?.pastHero === previousMotion.frame?.pastHero
      )
        return;
      previousMotion = next;
      setMotion(next);
    };
    const schedule = () => {
      if (!animationFrame && !disposed)
        animationFrame = requestAnimationFrame(render);
    };
    const refresh = () => {
      geometry = undefined;
      schedule();
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);
    const wordmark = document.getElementById('hero-wordmark');
    if (wordmark) observer.observe(wordmark);
    const header = document.getElementById('site-header');
    if (header) observer.observe(header);
    const unsubscribe = subscribeWindowScroll(render);
    window.addEventListener('resize', refresh);
    void document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      unsubscribe();
      window.removeEventListener('resize', refresh);
    };
  }, [reduceMotion]);

  return reduceMotion ? idleMotion : motion;
}
