import {
  PROJECT_DISTANCE,
  TRANSITION_DISTANCE,
  type SequenceTimeline,
} from '../scroll/scrollTimeline';

// projectCount is the closing-screen sentinel in both scroll and manual modes.
export function getPortfolioStage(
  position: number,
  projectCount: number,
  timeline: SequenceTimeline,
) {
  if (position >= timeline.closingStart + TRANSITION_DISTANCE / 2)
    return projectCount;
  return Math.max(
    0,
    Math.min(
      projectCount - 1,
      Math.floor((position - timeline.projectsStart) / PROJECT_DISTANCE),
    ),
  );
}
