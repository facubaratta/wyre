import { between, ease, via } from './motion';
import type { TitleMotion } from './TitleTransitionContext';
import type { TitleGeometry } from './titleTransitionGeometry';

export function createTitleMotion(
  geometry: TitleGeometry,
  progress: number,
  returningToHero: boolean,
): TitleMotion {
  return {
    moving: progress > 0 && !returningToHero,
    frame: {
      text: geometry.text,
      progress,
      x: via(geometry.fromX, geometry.middleX, geometry.toX, progress),
      y: via(geometry.fromY, geometry.middleY, geometry.toY, progress),
      width: geometry.width,
      fontSize: geometry.fontSize,
      lineHeight: geometry.lineHeight,
      weight: geometry.weight,
      spacing: geometry.spacing,
      scale: via(1, geometry.middleScale, geometry.targetScale, progress),
      complete: progress === 1 || returningToHero,
      heroExit: returningToHero ? 0 : ease(between(progress, 0, 0.24)),
      reveal: ease(between(progress, 0.84, 1)),
      globe: {
        x: via(
          geometry.globeFromX,
          geometry.globeMiddleX,
          geometry.globeToX,
          progress,
        ),
        y: via(
          geometry.globeFromY,
          geometry.globeMiddleY,
          geometry.globeToY,
          progress,
        ),
        size: geometry.globeSize,
        scale: via(1, geometry.globeMiddleScale, geometry.globeScale, progress),
      },
    },
  };
}
