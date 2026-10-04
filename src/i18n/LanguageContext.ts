import { createContext, useContext } from 'react';
import { messages, type Language } from './messages';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('LanguageProvider is required');
  return { ...value, copy: messages[value.language] };
}
