import { test, expect } from '@playwright/test';

test('content and styling are available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#human-heading')).toHaveText('Decisiones Humanas');
  await expect(page.locator('#growth-heading')).toHaveText('Crecimiento real');
  await expect(page.locator('#ai-example figure')).toHaveCount(1);
  expect(
    await page
      .locator('#hero')
      .evaluate((element) => getComputedStyle(element).display),
  ).toBe('flex');
  const contact = page
    .locator('#hero-actions')
    .getByRole('link', { name: 'Hablemos' });
  const contactUrl = new URL(await contact.getAttribute('href'));
  expect(contactUrl.origin + contactUrl.pathname).toBe(
    'https://wa.me/5491133610131',
  );
  expect(contactUrl.searchParams.get('text')).toBe(
    'Hola, me interesa contactar a Wyre',
  );
  const service = page.getByRole('link', {
    name: 'Me interesa: Sitio institucional. Ver opciones de contacto',
  });
  const serviceUrl = new URL(await service.getAttribute('href'));
  expect(serviceUrl.origin + serviceUrl.pathname).toBe(
    'https://wa.me/5491133610131',
  );
  expect(serviceUrl.searchParams.get('text')).toBe(
    'Hola Wyre, me interesa un sitio institucional.',
  );
  // Intercept the external handoff so the test never opens a real contact service.
  await page.route('https://wa.me/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<p>Contact handoff</p>' }),
  );
  await contact.click();
  await expect(page).toHaveURL(contactUrl.href);
  await expect(page.getByText('Contact handoff')).toBeVisible();
  await context.close();
});
