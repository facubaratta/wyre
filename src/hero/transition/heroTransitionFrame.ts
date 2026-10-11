import { ease } from './motion';
import type { HeroMotion } from './HeroTransitionContext';
import { clamp } from '../../scroll/scrollTimeline';

export const getHeroProgress = (
  geometry: { start: number; end: number },
  y: number,
) =>
  y >= geometry.end - 1
    ? 1
    : clamp((y - geometry.start) / (geometry.end - geometry.start));

export function createHeroMotion(
  progress: number,
  returningToHero: boolean,
): HeroMotion {
  return {
    moving: progress > 0 && !returningToHero,
    frame: {
      pastHero: progress === 1,
      complete: progress === 1 || returningToHero,
      progress: returningToHero ? 0 : ease(progress),
    },
  };
}
