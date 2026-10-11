import { between, ease } from './motion';
import type { HeroMotion } from './HeroTransitionContext';
import type { HeroGeometry } from './heroTransitionGeometry';
import { clamp } from '../../scroll/scrollTimeline';

export const getHeroProgress = (
  geometry: { start: number; end: number },
  y: number,
) =>
  y >= geometry.end - 1
    ? 1
    : clamp((y - geometry.start) / (geometry.end - geometry.start));

export function createHeroMotion(
  geometry: HeroGeometry,
  progress: number,
  returningToHero: boolean,
): HeroMotion {
  return {
    moving: progress > 0 && !returningToHero,
    frame: {
      pastHero: progress === 1,
      complete: progress === 1 || returningToHero,
      heroExit: returningToHero ? 0 : ease(between(progress, 0, 0.24)),
      wires: geometry.wires,
    },
  };
}
