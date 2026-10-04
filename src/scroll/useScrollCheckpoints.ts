import { useEffect, useRef } from 'react';
import { CHECKPOINT_OFFSET, PROJECT_DISTANCE } from './scrollTimeline';
import { getWindowScroll, subscribeWindowScroll } from './windowScrollStore';

const createCheckpoints = (length: number, start: number, distance: number) =>
  Array.from({ length }, (_, index) => start + index * distance);

interface Options {
  projectCount: number;
  projectsStart: number;
  atEnd: boolean;
  reduceMotion: boolean;
  onNextReducedMotion: () => void;
}

export default function useScrollCheckpoints({
  projectCount,
  projectsStart,
  atEnd,
  reduceMotion,
  onNextReducedMotion,
}: Options) {
  const pendingPosition = useRef<number | null>(null);
  useEffect(() => {
    let previousY = getWindowScroll().y;
    return subscribeWindowScroll(() => {
      const { y } = getWindowScroll();
      const movingUp = y < previousY;
      previousY = y;
      const pending = pendingPosition.current;
      if (pending !== null && (y >= pending - 2 || movingUp))
        pendingPosition.current = null;
    });
  }, []);

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
    // A tap can request the next checkpoint; only a drag interrupts scrolling.
    window.addEventListener('touchmove', clearPending, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', clearPending);
    return () => {
      window.removeEventListener('wheel', clearPending);
      window.removeEventListener('touchmove', clearPending);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', clearPending);
    };
  }, []);

  const nextCheckpoint = () => {
    const scroll = getWindowScroll();
    const pageBottom = Math.max(
      document.documentElement.scrollHeight - scroll.viewport,
      0,
    );
    // The portfolio section entrance already selects the first website.
    const projectCheckpoints = createCheckpoints(
      Math.max(0, projectCount - 1),
      projectsStart + PROJECT_DISTANCE + CHECKPOINT_OFFSET,
      PROJECT_DISTANCE,
    );

    const headerHeight =
      document.getElementById('site-header')?.getBoundingClientRect().height ??
      0;
    const sectionCheckpoints = [
      'presencia-web',
      'decisiones-humanas',
      'crecimiento-real',
    ].flatMap((id) => {
      const section = document.getElementById(id);
      if (!section) return [];
      const start =
        (section.getBoundingClientRect().top +
          window.scrollY -
          (id === 'crecimiento-real' ? 0 : headerHeight)) /
        scroll.viewport;
      return [start];
    });

    const checkpoints = [
      ...sectionCheckpoints,
      ...projectCheckpoints,
      pageBottom / scroll.viewport,
    ];

    if (
      reduceMotion &&
      window.scrollY >= (sectionCheckpoints.at(-1) ?? 0) * scroll.viewport
    ) {
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
    // Round forward so fractional section bounds reach the transition's end.
    pendingPosition.current =
      next === undefined ? pageBottom : Math.ceil(next * scroll.viewport);
    window.scrollTo({ top: pendingPosition.current, behavior: 'smooth' });
  };

  return nextCheckpoint;
}
