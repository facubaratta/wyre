import { useCallback, useSyncExternalStore } from 'react';
import {
  getWindowScroll,
  subscribeWindowScroll,
  type WindowScroll,
} from './windowScrollStore';

// Select a primitive or a stable object so unchanged values skip React renders.
export function useScrollSnapshot<T>(select: (scroll: WindowScroll) => T): T {
  const getSnapshot = useCallback(() => select(getWindowScroll()), [select]);
  return useSyncExternalStore(subscribeWindowScroll, getSnapshot);
}

export default function useWindowScroll() {
  return useSyncExternalStore(subscribeWindowScroll, getWindowScroll);
}

const viewportHeight = (scroll: WindowScroll) => scroll.viewport;
export const useViewportHeight = () => useScrollSnapshot(viewportHeight);
