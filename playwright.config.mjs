import { defineConfig } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Test the same base path as the most recent root or Pages production build.
const html = process.env.WYRE_DEV
  ? ''
  : readFileSync('dist/index.html', 'utf8');
const base = process.env.WYRE_DEV
  ? '/'
  : html.match(/src="([^"]*?)assets\/[^"]+\.js"/)?.[1];
if (!base) throw new Error('Run npm run build before the browser tests.');

const port = process.env.WYRE_TEST_PORT || '4173';
const previewUrl = `http://127.0.0.1:${port}${base}`;

export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  use: {
    baseURL: previewUrl,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  webServer: {
    command: process.env.WYRE_DEV
      ? `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`
      : `npm run preview -- --host 127.0.0.1 --port ${port} --strictPort --base=${base}`,
    url: previewUrl,
    reuseExistingServer: !!process.env.WYRE_DEV && !process.env.CI,
  },
});
