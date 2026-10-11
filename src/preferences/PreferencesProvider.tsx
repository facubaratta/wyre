import { useMemo, type PropsWithChildren } from 'react';
import { DEFAULT_ACCENT } from './useAccentColor';
import useReducedMotion from './useReducedMotion';
import { PreferencesContext } from './PreferencesContext';

export function PreferencesProvider({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion();
  const value = useMemo(
    () => ({ accent: DEFAULT_ACCENT, reduceMotion }),
    [reduceMotion],
  );
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
