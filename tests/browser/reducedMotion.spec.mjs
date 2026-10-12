import { test, expect } from '@playwright/test';

test('reduced motion keeps sections visible and disables hover motion', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    document.documentElement.style.getPropertyValue('--header-height'),
  );
  await page
    .locator('#crecimiento-real')
    .evaluate((element) =>
      window.scrollTo(
        0,
        Math.ceil(element.getBoundingClientRect().top + window.scrollY),
      ),
    );
  for (let index = 1; index <= 5; index++) {
    const card = page.locator(`#project-${index}`);
    await card.scrollIntoViewIfNeeded();
    await expect(page.locator('#crecimiento-real')).toHaveCSS('opacity', '1');
    await expect(card.locator('img')).toHaveCSS('transition-duration', '0s');
  }
  await page
    .locator('#hero-actions')
    .getByRole('link', { name: 'Let’s talk' })
    .click();
  await expect(page.locator('#closing-heading')).toBeVisible();
  expect(errors).toEqual([]);
});
