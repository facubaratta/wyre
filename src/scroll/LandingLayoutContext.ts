import { createContext, useContext, type RefObject } from 'react';
import type { SequenceTimeline } from './scrollTimeline';

interface LandingLayout {
  introRef: RefObject<HTMLDivElement | null>;
  introHeight: number;
  viewport: number;
  timeline: SequenceTimeline;
}

export const LandingLayoutContext = createContext<LandingLayout | null>(null);

export function useLandingLayout() {
  const value = useContext(LandingLayoutContext);
  if (!value)
    throw new Error('useLandingLayout must be used within its provider');
  return value;
}
