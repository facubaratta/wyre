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
