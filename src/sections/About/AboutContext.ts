import { createContext, useContext } from 'react';

export const AboutContext = createContext<{
  expanded: boolean;
  expand: () => void;
} | null>(null);

export function useAbout() {
  const value = useContext(AboutContext);
  if (!value) throw new Error('AboutProvider is required');
  return value;
}
