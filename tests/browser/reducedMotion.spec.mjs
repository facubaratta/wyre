import { test, expect } from '@playwright/test';

test('reduced motion hydrates and keeps manual project navigation', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await page
    .locator('#crecimiento-real')
    .evaluate((element) =>
      window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY),
    );
  await expect(page.locator('#crecimiento-real')).toBeVisible();
  await page
    .getByRole('button', { name: 'Scroll to the next section' })
    .focus();
  await page
    .getByRole('button', { name: 'Scroll to the next section' })
    .press('Enter');
  await expect(
    page.locator('picture:not([aria-hidden="true"]) img'),
  ).toHaveAttribute('alt', /Finca/);
  for (const name of ['ProTennisSquash', 'Club Zurich', 'Time Magnitude']) {
    await page
      .getByRole('button', { name: 'Scroll to the next section' })
      .press('Enter');
    await expect(
      page.locator('picture:not([aria-hidden="true"]) img'),
    ).toHaveAttribute('alt', `${name} website screenshot`);
  }
  await page
    .getByRole('button', { name: 'Scroll to the next section' })
    .press('Enter');
  await expect(page.locator('#closing-heading')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Scroll to top' }),
  ).toBeVisible();
  await page.screenshot({ path: 'test-results/closing-reduced-motion.png' });
  await page.getByRole('button', { name: 'Scroll to top' }).press('Enter');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(4);
  await expect(
    page.getByRole('button', { name: 'Scroll to the next section' }),
  ).toBeVisible();
  await expect(
    page.locator('picture:not([aria-hidden="true"]) img'),
  ).toHaveAttribute('alt', /Health & Harmony/);
  expect(errors).toEqual([]);
});
