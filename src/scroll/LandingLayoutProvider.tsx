import { useMemo, type PropsWithChildren } from 'react';
import { projects } from '../portfolio/projects';
import { createTimeline } from './scrollTimeline';
import useElementHeight from './useElementHeight';
import { useViewportHeight } from './useWindowScroll';
import { LandingLayoutContext } from './LandingLayoutContext';

export function LandingLayoutProvider({ children }: PropsWithChildren) {
  const viewport = useViewportHeight();
  const { elementRef: introRef, height: introHeight } = useElementHeight();
  const value = useMemo(
    () => ({
      introRef,
      introHeight,
      viewport,
      timeline: createTimeline(projects.length, introHeight / viewport),
    }),
    [introRef, introHeight, viewport],
  );
  return (
    <LandingLayoutContext.Provider value={value}>
      {children}
    </LandingLayoutContext.Provider>
  );
}
