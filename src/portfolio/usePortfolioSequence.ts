import { useState } from 'react';
import { usePreferences } from '../PreferencesProvider';
import {
  PROJECT_DISTANCE,
  TRANSITION_DISTANCE,
  createTimeline,
  progressBetween,
} from '../scrollTimeline';
import type { WindowScroll } from '../useWindowScroll';

export default function usePortfolioSequence(
  scroll: WindowScroll,
  serviceCount: number,
  projectCount: number,
) {
  const { reduceMotion } = usePreferences();
  const [manualIndex, setManualIndex] = useState(0);
  const timeline = createTimeline(serviceCount, projectCount);
  const position = scroll.y / scroll.viewport;

  return {
    manualIndex,
    progress: progressBetween(
      position,
      timeline.portfolioStart,
      TRANSITION_DISTANCE,
    ),
    closingProgress: reduceMotion
      ? Number(manualIndex === projectCount)
      : progressBetween(position, timeline.closingStart, TRANSITION_DISTANCE),
    projectIndex: reduceMotion
      ? Math.min(manualIndex, projectCount - 1)
      : Math.max(
          0,
          Math.min(
            projectCount - 1,
            Math.floor((position - timeline.projectsStart) / PROJECT_DISTANCE),
          ),
        ),
    selectProject: (projectIndex: number) => {
      if (projectIndex < 0 || projectIndex >= projectCount) return;
      if (reduceMotion) {
        setManualIndex(projectIndex);
        return;
      }

      window.scrollTo({
        top:
          (timeline.projectsStart + projectIndex * PROJECT_DISTANCE + 0.05) *
          scroll.viewport,
        behavior: 'instant',
      });
    },
    nextManualProject: () =>
      setManualIndex((index) => Math.min(index + 1, projectCount)),
    scrollShadowOpacity: reduceMotion
      ? 1
      : 1 - progressBetween(position, timeline.closingEnd - 0.3, 0.3),
    timeline,
  };
}
