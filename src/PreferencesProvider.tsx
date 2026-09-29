import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import useAccentColor from './useAccentColor';
import { useEffect, useState } from 'react';

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return reduceMotion;
}

interface Preferences {
  accent: string;
  setAccent: (color: string) => void;
  reduceMotion: boolean;
}

const PreferencesContext = createContext<Preferences | null>(null);

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

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value)
    throw new Error('usePreferences must be used within PreferencesProvider');
  return value;
}
