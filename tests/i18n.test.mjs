import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

const { languageFromPath, languagePath } = await importSource(
  '../src/i18n/routes.ts',
);

test('locale routes default to English and support a deployment subpath', () => {
  for (const path of [
    '/',
    '/en/',
    '/own-landing-page/',
    '/own-landing-page/en/',
  ])
    assert.equal(languageFromPath(path), 'en');
  for (const path of ['/es/', '/es', '/own-landing-page/es/'])
    assert.equal(languageFromPath(path), 'es');
  assert.equal(languagePath('es', '/'), '/es/');
  assert.equal(
    languagePath('en', '/own-landing-page/'),
    '/own-landing-page/en/',
  );
});
