import { useEffect, useRef } from 'react';
import {
  CHECKPOINT_OFFSET,
  PROJECT_DISTANCE,
  SERVICE_DISTANCE,
  SERVICE_START,
} from './scrollTimeline';
import type { WindowScroll } from './useWindowScroll';

interface Options {
  scroll: WindowScroll;
  serviceCount: number;
  projectCount: number;
  hintStart: number;
  projectsStart: number;
  atEnd: boolean;
  reduceMotion: boolean;
  onNextReducedMotion: () => void;
}

export default function useScrollCheckpoints({
  scroll,
  serviceCount,
  projectCount,
  hintStart,
  projectsStart,
  atEnd,
  reduceMotion,
  onNextReducedMotion,
}: Options) {
  const pendingPosition = useRef<number | null>(null);
  const pageBottom = Math.max(
    document.documentElement.scrollHeight - scroll.viewport,
    0,
  );
  useEffect(() => {
    const pending = pendingPosition.current;
    if (pending === null) return;

    // Keep the target while smooth scrolling toward it. If the user interrupts
    // that motion, discard the stale target so the next click uses their position.
    const distance = Math.abs(scroll.y - pending);
    if (distance < 2 || (distance > 2 && scroll.y < pending - 2)) {
      pendingPosition.current = null;
    }
  }, [scroll.y]);

  const checkpoints = [
    ...Array.from(
      { length: serviceCount },
      (_, index) =>
        SERVICE_START + index * SERVICE_DISTANCE + CHECKPOINT_OFFSET,
    ),
    hintStart + CHECKPOINT_OFFSET,
    projectsStart + CHECKPOINT_OFFSET,
    ...Array.from(
      { length: projectCount },
      (_, index) =>
        projectsStart + index * PROJECT_DISTANCE + CHECKPOINT_OFFSET,
    ),
    pageBottom / scroll.viewport,
  ].filter(
    (point, index, points) => index === 0 || point !== points[index - 1],
  );

  const nextCheckpoint = () => {
    if (reduceMotion) {
      onNextReducedMotion();
      return;
    }

    if (atEnd) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const current =
      (pendingPosition.current ?? window.scrollY) / scroll.viewport;
    const next = checkpoints.find((point) => point > current + 0.02);
    if (next === undefined) return;

    pendingPosition.current = next * scroll.viewport;
    window.scrollTo({ top: pendingPosition.current, behavior: 'smooth' });
  };

  return nextCheckpoint;
}
