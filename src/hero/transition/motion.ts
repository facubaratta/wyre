import { clamp } from '../../scroll/scrollTimeline';

export const between = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start));
export const ease = (progress: number) =>
  progress * progress * (3 - 2 * progress);
