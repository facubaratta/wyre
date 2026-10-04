import { languageFromPath } from './i18n/routes';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App language={languageFromPath(window.location.pathname)} />
  </StrictMode>
);

if (root.hasChildNodes() && root.querySelector('main')) hydrateRoot(root, app);
else createRoot(root).render(app);
