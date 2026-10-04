import { StrictMode } from 'react';
import { renderToReadableStream, renderToString } from 'react-dom/server';
import App from './App';

export async function render(): Promise<string> {
  const stream = await renderToReadableStream(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  await stream.allReady;
  await stream.cancel();
  // Resolve lazy modules first, then emit completed boundaries with no reveal scripts.
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export {
  getAccentVariables,
  DEFAULT_ACCENT,
} from './preferences/useAccentColor';
