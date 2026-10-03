export const TRANSITION_DISTANCE = 1;
export const PROJECT_DISTANCE = 1;
export const CHECKPOINT_OFFSET = 0.05;

export interface SequenceTimeline {
  portfolioStart: number;
  projectsStart: number;
  closingStart: number;
  closingEnd: number;
}

export function createTimeline(
  projectCount: number,
  introScreens: number,
): SequenceTimeline {
  const portfolioStart = Math.max(0, introScreens - TRANSITION_DISTANCE);
  const projectsStart = portfolioStart + TRANSITION_DISTANCE;
  const closingStart = projectsStart + projectCount * PROJECT_DISTANCE;

  return {
    portfolioStart,
    projectsStart,
    closingStart,
    closingEnd: closingStart + TRANSITION_DISTANCE,
  };
}

export const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function progressBetween(
  position: number,
  start: number,
  distance: number,
) {
  return clamp((position - start) / distance);
}
