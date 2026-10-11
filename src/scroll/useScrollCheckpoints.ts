import { useEffect, useRef } from 'react';
import { getWindowScroll, subscribeWindowScroll } from './windowScrollStore';

interface Options {
  atEnd: boolean;
  reduceMotion: boolean;
  onReset: () => void;
}

export default function useScrollCheckpoints({
  atEnd,
  reduceMotion,
  onReset,
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
    if (atEnd) {
      pendingPosition.current = null;
      onReset();
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? 'instant' : 'smooth',
      });
      return;
    }

    const scroll = getWindowScroll();
    const pageBottom = Math.max(
      document.documentElement.scrollHeight - scroll.viewport,
      0,
    );
    const headerHeight =
      document.getElementById('site-header')?.getBoundingClientRect().height ??
      0;
    const sectionCheckpoints = [
      'presencia-web',
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

    const checkpoints = [...sectionCheckpoints, pageBottom / scroll.viewport];

    const current =
      (pendingPosition.current ?? window.scrollY) / scroll.viewport;
    const next = checkpoints.find((point) => point > current + 0.02);
    // Round forward so fractional section bounds reach the transition's end.
    pendingPosition.current =
      next === undefined ? pageBottom : Math.ceil(next * scroll.viewport);
    window.scrollTo({
      top: pendingPosition.current,
      behavior: reduceMotion ? 'instant' : 'smooth',
    });
  };

  return nextCheckpoint;
}
