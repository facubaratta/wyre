import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { LanguageContext } from './LanguageContext';
import { messages, type Language } from './messages';
import { languageFromPath, languagePath } from './routes';

export default function LanguageProvider({
  initialLanguage,
  children,
}: PropsWithChildren<{ initialLanguage: Language }>) {
  const [language, updateLanguage] = useState(initialLanguage);
  useEffect(() => {
    const restore = () =>
      updateLanguage(languageFromPath(window.location.pathname));
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = messages[language].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', messages[language].meta.description);
  }, [language]);
  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      window.history.pushState(
        null,
        '',
        `${languagePath(next)}${window.location.search}${window.location.hash}`,
      );
      updateLanguage(next);
    },
    [language],
  );
  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
