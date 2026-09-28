import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import useAccentColor from '../theme/useAccentColor';
import useReducedMotion from '../hooks/useReducedMotion';

interface Preferences {
  accent: string;
  setAccent: (color: string) => void;
  reduceMotion: boolean;
}

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const { accent, setAccent } = useAccentColor();
  const reduceMotion = useReducedMotion();
  const value = useMemo(() => ({ accent, setAccent, reduceMotion }), [accent, setAccent, reduceMotion]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('usePreferences must be used within PreferencesProvider');
  return value;
}
