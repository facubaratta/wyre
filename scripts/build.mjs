import { build } from 'vite';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const baseArg = args.find((arg) => arg.startsWith('--base='));
const base =
  baseArg?.slice(7) ??
  (args.includes('--base') ? args[args.indexOf('--base') + 1] : '/');
await build({ base });
const serverDirectory = '.prerender';
try {
  await build({
    base,
    ssr: {
      noExternal: [
        '@mui/material',
        '@mui/system',
        '@mui/utils',
        '@mui/styled-engine',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: serverDirectory,
    },
  });
  const { render, getAccentVariables, DEFAULT_ACCENT } = await import(
    pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href
  );
  const template = await readFile('dist/index.html', 'utf8');
  const markup = await render();
  const variables = Object.entries(getAccentVariables(DEFAULT_ACCENT))
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
  await writeFile(
    'dist/index.html',
    template
      .replace('<!--prerender-->', markup)
      .replace('color-scheme:dark;', `color-scheme:dark;${variables};`),
  );
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
