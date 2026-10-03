import { createContext, useContext } from 'react';
import type usePortfolioSequence from './usePortfolioSequence';

export const PortfolioSequenceContext = createContext<ReturnType<
  typeof usePortfolioSequence
> | null>(null);
export function usePortfolioSequenceState() {
  const value = useContext(PortfolioSequenceContext);
  if (!value)
    throw new Error(
      'usePortfolioSequenceState must be used within its provider',
    );
  return value;
}
