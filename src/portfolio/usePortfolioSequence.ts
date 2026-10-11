import { useCallback, useMemo, useState } from 'react';

export default function usePortfolioSequence(projectCount: number) {
  const [stage, setStage] = useState(0);
  const selectProject = useCallback(
    (index: number) => {
      if (Number.isInteger(index) && index >= 0 && index <= projectCount)
        setStage(index);
    },
    [projectCount],
  );
  const nextManualProject = useCallback(
    () => setStage((index) => Math.min(index + 1, projectCount)),
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
