import type { Language } from './messages';

export function languageFromPath(path: string): Language {
  return /\/es\/?$/.test(path) ? 'es' : 'en';
}

export function languagePath(
  language: Language,
  base = import.meta.env.BASE_URL,
) {
  return `${base.replace(/\/$/, '')}/${language}/`;
}
