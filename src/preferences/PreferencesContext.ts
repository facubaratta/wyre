import { createContext, useContext } from 'react';

interface Preferences {
  accent: string;
  setAccent: (color: string) => void;
  reduceMotion: boolean;
}

export const PreferencesContext = createContext<Preferences | null>(null);

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value)
    throw new Error('usePreferences must be used within PreferencesProvider');
  return value;
}
