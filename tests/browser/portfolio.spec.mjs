import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
]) {
  test(`portfolio shows linked project cards at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    const section = page.locator('#crecimiento-real');
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator('article')).toHaveCount(5);
    for (const card of await section.locator('article').all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card.locator('h3')).toBeVisible();
      await expect(card.locator('a')).toHaveAttribute('href', /^https:\/\//);
      await expect(card.locator('a')).toHaveAttribute('target', '_blank');
      await expect
        .poll(() =>
          card
            .locator('img')
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
    }
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await section.locator('article').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `test-results/portfolio-grid-${viewport.width}.png`,
      fullPage: false,
    });
    if (viewport.width >= 900) {
      const index = page.getByRole('navigation', { name: 'Project index' });
      await index.getByRole('link', { name: /Club Zurich/ }).click();
      await expect(page.locator('#project-4 h3')).toBeVisible();
      await expect(
        index.getByRole('link', { name: /Club Zurich/ }),
      ).toHaveAttribute('aria-current', 'location');
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `test-results/portfolio-index-${viewport.width}.png`,
      });
    }
    expect(errors).toEqual([]);
  });
}

test('portfolio elements own hover motion and respect reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./en/');
  const card = page.locator('#project-1');
  const image = card.locator('img');
  await card.scrollIntoViewIfNeeded();
  await image.hover();
  await expect(image).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -8)');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(image).toHaveCSS('transform', 'none');
  await expect(image).toHaveCSS('transition-duration', '0s');
});
