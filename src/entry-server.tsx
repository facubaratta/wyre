import type { Language } from './i18n/messages';
export { messages } from './i18n/messages';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export async function render(language: Language = 'en'): Promise<string> {
  return renderToString(
    <StrictMode>
      <App language={language} />
    </StrictMode>,
  );
}

export { getAccentVariables, DEFAULT_ACCENT } from './brand/accentVariables';
