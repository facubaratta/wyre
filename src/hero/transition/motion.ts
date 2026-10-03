import { clamp } from '../../scroll/scrollTimeline';

export const between = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start));
export const ease = (progress: number) =>
  progress * progress * (3 - 2 * progress);
export const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;
export const via = (
  from: number,
  middle: number,
  to: number,
  progress: number,
) =>
  progress < 0.62
    ? mix(from, middle, ease(between(progress, 0, 0.42)))
    : mix(middle, to, ease(between(progress, 0.62, 1)));
