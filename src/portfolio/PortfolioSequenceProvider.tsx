import type { PropsWithChildren } from 'react';
import { projects } from './projects';
import usePortfolioSequence from './usePortfolioSequence';
import { PortfolioSequenceContext } from './PortfolioSequenceContext';

export default function PortfolioSequenceProvider({
  children,
}: PropsWithChildren) {
  const value = usePortfolioSequence(projects.length);
  return (
    <PortfolioSequenceContext.Provider value={value}>
      {children}
    </PortfolioSequenceContext.Provider>
  );
}
