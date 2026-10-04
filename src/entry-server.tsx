import type { Language } from './i18n/messages';
export { messages } from './i18n/messages';
import { StrictMode } from 'react';
import { renderToReadableStream, renderToString } from 'react-dom/server';
import App from './App';

export async function render(language: Language = 'en'): Promise<string> {
  const stream = await renderToReadableStream(
    <StrictMode>
      <App language={language} />
    </StrictMode>,
  );
  await stream.allReady;
  await stream.cancel();
  // Resolve lazy modules first, then emit completed boundaries with no reveal scripts.
  return renderToString(
    <StrictMode>
      <App language={language} />
    </StrictMode>,
  );
}

export {
  getAccentVariables,
  DEFAULT_ACCENT,
} from './preferences/useAccentColor';
