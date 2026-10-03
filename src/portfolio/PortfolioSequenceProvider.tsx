import type { PropsWithChildren } from 'react';
import { useLandingLayout } from '../scroll/LandingLayoutContext';
import { projects } from './projects';
import usePortfolioSequence from './usePortfolioSequence';
import { PortfolioSequenceContext } from './PortfolioSequenceContext';

export default function PortfolioSequenceProvider({
  children,
}: PropsWithChildren) {
  const { viewport, timeline } = useLandingLayout();
  const value = usePortfolioSequence(viewport, projects.length, timeline);
  return (
    <PortfolioSequenceContext.Provider value={value}>
      {children}
    </PortfolioSequenceContext.Provider>
  );
}
