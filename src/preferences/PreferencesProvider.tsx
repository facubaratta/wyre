import { useMemo, type PropsWithChildren } from 'react';
import useAccentColor from './useAccentColor';
import useReducedMotion from './useReducedMotion';
import { PreferencesContext } from './PreferencesContext';

export function PreferencesProvider({ children }: PropsWithChildren) {
  const { accent, setAccent } = useAccentColor();
  const reduceMotion = useReducedMotion();
  const value = useMemo(
    () => ({ accent, setAccent, reduceMotion }),
    [accent, setAccent, reduceMotion],
  );
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
