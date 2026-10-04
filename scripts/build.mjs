import { build } from 'vite';
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
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
  const { render, messages, getAccentVariables, DEFAULT_ACCENT } = await import(
    pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href
  );
  const template = await readFile('dist/index.html', 'utf8');
  const variables = Object.entries(getAccentVariables(DEFAULT_ACCENT))
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
  const escapeHtml = (value) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character],
    );
  for (const language of ['en', 'es']) {
    const markup = await render(language);
    const html = template
      .replace('<!--prerender-->', markup)
      .replace('lang="en"', `lang="${language}"`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${escapeHtml(messages[language].meta.title)}</title>`,
      )
      .replace(
        /(<meta name="description" content=")[^"]*(")/,
        (_, start, end) =>
          `${start}${escapeHtml(messages[language].meta.description)}${end}`,
      )
      .replace('color-scheme:dark;', `color-scheme:dark;${variables};`);
    await mkdir(`dist/${language}`, { recursive: true });
    await writeFile(`dist/${language}/index.html`, html);
    if (language === 'en') await writeFile('dist/index.html', html);
  }
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
