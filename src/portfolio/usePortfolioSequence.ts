import { useCallback, useMemo, useState } from 'react';
import { usePreferences } from '../preferences/PreferencesContext';
import {
  CHECKPOINT_OFFSET,
  PROJECT_DISTANCE,
  type SequenceTimeline,
} from '../scroll/scrollTimeline';
import { useScrollSnapshot } from '../scroll/useWindowScroll';
import { getPortfolioStage } from './portfolioSequence';

export default function usePortfolioSequence(
  viewport: number,
  projectCount: number,
  timeline: SequenceTimeline,
) {
  const { reduceMotion } = usePreferences();
  const [manualIndex, setManualIndex] = useState(0);
  const stage = useScrollSnapshot((scroll) =>
    reduceMotion
      ? manualIndex
      : getPortfolioStage(scroll.y / scroll.viewport, projectCount, timeline),
  );
  const selectProject = useCallback(
    (index: number) => {
      if (!Number.isInteger(index) || index < 0 || index > projectCount) return;
      if (reduceMotion) {
        setManualIndex(index);
        return;
      }
      window.scrollTo({
        top:
          (index === projectCount
            ? timeline.closingEnd
            : timeline.projectsStart +
              index * PROJECT_DISTANCE +
              CHECKPOINT_OFFSET) * viewport,
        behavior: 'instant',
      });
    },
    [
      reduceMotion,
      projectCount,
      timeline.projectsStart,
      timeline.closingEnd,
      viewport,
    ],
  );
  const nextManualProject = useCallback(
    () => setManualIndex((index) => Math.min(index + 1, projectCount)),
    [projectCount],
  );
  return useMemo(
    () => ({
      closingProgress: Number(stage === projectCount),
      projectIndex: Math.min(stage, projectCount - 1),
      selectProject,
      nextManualProject,
    }),
    [stage, projectCount, selectProject, nextManualProject],
  );
}
