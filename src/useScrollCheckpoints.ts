import { useEffect, useRef } from 'react';
import {
  CHECKPOINT_OFFSET,
  PROJECT_DISTANCE,
  SERVICE_DISTANCE,
  SERVICE_START,
} from './scrollTimeline';
import type { WindowScroll } from './useWindowScroll';

const createCheckpoints = (length: number, start: number, distance: number) =>
  Array.from({ length }, (_, index) => start + index * distance);

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
  const previousY = useRef(scroll.y);
  const pageBottom = Math.max(
    document.documentElement.scrollHeight - scroll.viewport,
    0,
  );
  useEffect(() => {
    const movingUp = scroll.y < previousY.current;
    previousY.current = scroll.y;
    const pending = pendingPosition.current;
    if (pending === null) return;

    // Downward animation keeps its target until arrival or a reversal.
    if (scroll.y >= pending - 2 || movingUp) {
      pendingPosition.current = null;
    }
  }, [scroll.y]);

  useEffect(() => {
    const clearPending = () => {
      pendingPosition.current = null;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === ' ' &&
        event.target instanceof Element &&
        event.target.closest(
          'button, input, textarea, select, [contenteditable]',
        )
      ) {
        return;
      }
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      ) {
        clearPending();
      }
    };

    window.addEventListener('wheel', clearPending, { passive: true });
    window.addEventListener('touchstart', clearPending, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', clearPending);
    return () => {
      window.removeEventListener('wheel', clearPending);
      window.removeEventListener('touchstart', clearPending);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', clearPending);
    };
  }, []);

  const serviceCheckpoints = createCheckpoints(
    serviceCount,
    SERVICE_START + CHECKPOINT_OFFSET,
    SERVICE_DISTANCE,
  );

  const projectCheckpoints = createCheckpoints(
    projectCount,
    projectsStart + CHECKPOINT_OFFSET,
    PROJECT_DISTANCE,
  );

  const checkpoints = [
    ...serviceCheckpoints,
    hintStart + CHECKPOINT_OFFSET,
    projectsStart + CHECKPOINT_OFFSET,
    ...projectCheckpoints,
    pageBottom / scroll.viewport,
  ];

  const nextCheckpoint = () => {
    if (reduceMotion) {
      onNextReducedMotion();
      return;
    }

    if (atEnd) {
      pendingPosition.current = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const current =
      (pendingPosition.current ?? window.scrollY) / scroll.viewport;
    const next = checkpoints.find((point) => point > current + 0.02);
    pendingPosition.current =
      next === undefined ? pageBottom : next * scroll.viewport;
    window.scrollTo({ top: pendingPosition.current, behavior: 'smooth' });
  };

  return nextCheckpoint;
}
