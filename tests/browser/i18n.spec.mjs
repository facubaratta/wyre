import { test, expect } from '@playwright/test';

for (const [route, language, heading, contact] of [
  ['./', 'en', 'Web presence', 'Let’s talk'],
  ['./en/', 'en', 'Web presence', 'Let’s talk'],
  ['./es/', 'es', 'Presencia web', 'Hablemos'],
]) {
  test(`direct ${route} route renders its language without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('#web-heading')).toHaveText(heading);
    await expect(
      page.locator('#hero-actions').getByRole('link', { name: contact }),
    ).toBeVisible();
    await expect(page).toHaveTitle(
      language === 'en' ? /Custom web design/ : /Diseño y desarrollo/,
    );
    await context.close();
  });
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
]) {
  test(`language toggle switches language at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto('./en/?source=test');
    await page.evaluate(() => document.fonts.ready);
    const toggle = page
      .locator('#hero-actions')
      .getByRole('link', { name: 'Cambiar a español' });
    await expect(toggle).toHaveText('EN/ES');
    await toggle.click();
    await expect(page).toHaveURL(/\/es\/\?source=test$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('#web-heading')).toHaveText('Presencia web');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(
      page
        .locator('#hero-actions')
        .getByRole('link', { name: 'Switch to English' }),
    ).toBeVisible();
    await page.goBack();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.goForward();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await page.reload();
    await expect(page.locator('#web-heading')).toHaveText('Presencia web');
    await page.screenshot({
      path: `test-results/hero-es-${viewport.width}.png`,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('navbar language changes translate a previously selected contact service', async ({
  page,
}) => {
  await page.goto('./en/');
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole('link', {
      name: 'I’m interested: Company website. View contact options',
    })
    .click();
  const closing = page.locator('section[aria-labelledby="closing-heading"]');
  await expect(closing).not.toHaveAttribute('aria-hidden', 'true');
  const whatsapp = closing.getByRole('link', { name: /^WhatsApp:/ });
  expect(
    new URL(await whatsapp.getAttribute('href')).searchParams.get('text'),
  ).toBe('Hi Wyre, I’m interested in a company website.');
  await expect(page.locator('#closing-heading')).toBeVisible();
  // The navbar appears when scrolling upward after the contact scroll finishes.
  await page.evaluate(() => window.scrollBy({ top: -80, behavior: 'instant' }));
  await expect(page.locator('#site-header')).not.toHaveAttribute('inert');
  await page
    .locator('#navbar-actions')
    .getByRole('link', { name: 'Cambiar a español' })
    .click();
  await expect(page.locator('#closing-heading')).toHaveText(
    'Tu próxima web o app mobile',
  );
  expect(
    new URL(await whatsapp.getAttribute('href')).searchParams.get('text'),
  ).toBe('Hola Wyre, me interesa un sitio institucional.');
});
