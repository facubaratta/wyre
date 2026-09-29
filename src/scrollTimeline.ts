export const SERVICE_START = 0.5;
export const SERVICE_DISTANCE = 0.75;
export const HINT_PAUSE = 1;
export const TRANSITION_DISTANCE = 1;
export const PROJECT_DISTANCE = 1;
export const CHECKPOINT_OFFSET = 0.05;

export interface SequenceTimeline {
  hintStart: number;
  portfolioStart: number;
  projectsStart: number;
  closingStart: number;
  closingEnd: number;
}

export function createTimeline(
  serviceCount: number,
  projectCount: number,
): SequenceTimeline {
  const hintStart = SERVICE_START + serviceCount * SERVICE_DISTANCE;
  const portfolioStart = hintStart + HINT_PAUSE;
  const projectsStart = portfolioStart + TRANSITION_DISTANCE;
  const closingStart = projectsStart + projectCount * PROJECT_DISTANCE;

  return {
    hintStart,
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
