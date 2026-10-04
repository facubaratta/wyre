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
    await expect(page.locator('#hero-title-web')).toHaveText(heading);
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
  test(`combined picker switches language and color at ${viewport.width}`, async ({
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
    const picker = page
      .locator('#hero-actions')
      .getByRole('button', { name: 'Choose language and accent color' });
    await expect(picker).toHaveText('EN');
    await picker.click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Mint', exact: true }).click();
    await dialog.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/\?source=test$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('#hero-title-web')).toHaveText('Presencia web');
    await expect(dialog.getByRole('link', { name: 'Español' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(dialog.getByRole('link', { name: 'Español' })).toHaveCSS(
      'background-color',
      'rgb(53, 208, 186)',
    );
    await expect(dialog.getByRole('link', { name: 'English' })).toHaveCSS(
      'color',
      'rgb(235, 232, 222)',
    );
    await expect(dialog.getByRole('button', { name: 'Menta' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page.screenshot({
      path: `test-results/picker-es-${viewport.width}.png`,
    });
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(
      page
        .locator('#hero-actions')
        .getByRole('button', { name: 'Elegir idioma y color de acento' }),
    ).toHaveText('ES');
    await page.goBack();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    expect(
      await page.evaluate(() =>
        document.documentElement.style.getPropertyValue('--accent'),
      ),
    ).toBe('#35d0ba');
    await page.goForward();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await page.reload();
    await expect(page.locator('#hero-title-web')).toHaveText('Presencia web');
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
  await expect(closing).toHaveAttribute('aria-hidden', 'false');
  const whatsapp = closing.getByRole('link', { name: /^WhatsApp:/ });
  expect(
    new URL(await whatsapp.getAttribute('href')).searchParams.get('text'),
  ).toBe('Hi Wyre, I’m interested in a company website.');
  await expect(
    page.getByRole('button', { name: 'Scroll to top' }),
  ).toBeVisible();
  // The navbar appears when scrolling upward after the contact scroll finishes.
  await page.evaluate(() => window.scrollBy({ top: -80, behavior: 'instant' }));
  await expect(page.locator('#site-header')).not.toHaveAttribute('inert');
  await page
    .locator('#navbar-actions')
    .getByRole('button', { name: 'Choose language and accent color' })
    .click();
  await page.getByRole('dialog').getByRole('link', { name: 'Español' }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#closing-heading')).toHaveText(
    'Tu próxima web o app mobile',
  );
  expect(
    new URL(await whatsapp.getAttribute('href')).searchParams.get('text'),
  ).toBe('Hola Wyre, me interesa un sitio institucional.');
});
