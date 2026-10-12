import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`About navigation expands shared content and keeps it expanded across languages at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./en/');
    const details = page.locator('#about-details');
    await expect(details).not.toBeVisible();
    await page
      .locator('#hero-actions')
      .getByRole('link', { name: 'About', exact: true })
      .click();
    await expect(details).toBeVisible();
    await expect(details.locator('h3')).toHaveCount(4);
    await expect(page.getByRole('button', { name: 'Read more' })).toHaveCount(
      0,
    );
    await details.scrollIntoViewIfNeeded();
    await expect(details.locator('h3').first().locator('..')).toHaveCSS(
      'opacity',
      '1',
    );
    await page.screenshot({ path: `test-results/about-${width}.png` });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page
      .locator('#hero-actions')
      .getByRole('link', { name: 'Cambiar a español' })
      .click();
    await expect(details).toBeVisible();
    await expect(
      details.getByRole('heading', { name: 'Construimos con propósito' }),
    ).toBeVisible();
    await details.getByRole('link', { name: 'Hablemos', exact: true }).click();
    await expect(page.locator('#closing-heading')).toBeVisible();
  });
}

test('About read-more control reveals the details independently of navigation', async ({
  page,
}) => {
  await page.goto('./en/');
  await page.getByRole('button', { name: 'Read more' }).click();
  await expect(page.locator('#about-details')).toBeVisible();
  await expect(page.locator('#about-details h3')).toHaveCount(4);
});
