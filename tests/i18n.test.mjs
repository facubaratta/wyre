import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

const { languageFromPath, languagePath } = await importSource(
  '../src/i18n/routes.ts',
);
const { getWhatsAppUrl, getEmailUrl } = await importSource(
  '../src/contact/contactUrls.ts',
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

test('contact handoffs translate the selected service including the first service', () => {
  const message = (interest, language) =>
    new URL(getWhatsAppUrl(interest, language)).searchParams.get('text');
  assert.equal(message(0, 'en'), 'Hi Wyre, I’m interested in a landing page.');
  assert.equal(message(0, 'es'), 'Hola Wyre, me interesa una landing page.');
  assert.equal(
    message(2, 'en'),
    'Hi Wyre, I’m interested in a company website.',
  );
  assert.equal(
    message(2, 'es'),
    'Hola Wyre, me interesa un sitio institucional.',
  );
  assert.equal(message(null, 'es'), 'Hola, me interesa contactar a Wyre');
  const email = new URL(getEmailUrl(0, 'en'));
  assert.equal(email.searchParams.get('subject'), 'Service inquiry');
  assert.equal(email.searchParams.get('body'), message(0, 'en'));
});
