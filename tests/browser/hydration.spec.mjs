import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 390, height: 1200 },
]) {
  test(`prerender hydrates and scrolls at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#hero')).toBeVisible();
    await page.waitForFunction(() =>
      document.documentElement.style.getPropertyValue('--header-height'),
    );
    await expect(page.locator('main')).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/hero-${viewport.width}-${viewport.height}.png`,
    });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.fonts.check('400 16px Manrope')),
    ).toBe(true);
    const openingRequests = await page.evaluate(() =>
      performance.getEntriesByType('resource').map((entry) => entry.name),
    );
    expect(
      openingRequests.some((url) =>
        /fonts\.(googleapis|gstatic)\.com/.test(url),
      ),
    ).toBe(false);
    expect(
      openingRequests.filter((url) => /\/fonts\/.*\.woff2/.test(url)),
    ).toEqual([expect.stringContaining('/fonts/inter-latin-variable.woff2')]);
    expect(
      await page.evaluate(() =>
        performance
          .getEntriesByType('resource')
          .some((entry) => /assets\/Portfolio-.*\.js/.test(entry.name)),
      ),
    ).toBe(false);
    const before = await page.locator('#decisiones-humanas').boundingBox();
    await page.locator('#decisiones-humanas').scrollIntoViewIfNeeded();
    const after = await page.locator('#decisiones-humanas').boundingBox();
    expect(Math.abs(before.height - after.height)).toBeLessThan(2);
    await page.screenshot({
      path: `test-results/human-${viewport.width}-${viewport.height}.png`,
    });
    await page
      .locator('#crecimiento-real')
      .evaluate((element) =>
        window.scrollTo(
          0,
          element.getBoundingClientRect().top + window.scrollY,
        ),
      );
    const visibleImage = page.locator('picture:not([aria-hidden="true"]) img');
    await expect(visibleImage).toHaveCount(1);
    await expect
      .poll(() =>
        visibleImage.evaluate(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
    expect(await visibleImage.evaluate((image) => image.currentSrc)).toContain(
      '.webp',
    );
    expect(
      await visibleImage.evaluate((image) =>
        image.currentSrc.includes('mobile'),
      ),
    ).toBe(viewport.width <= 640);
    await page.screenshot({
      path: `test-results/portfolio-${viewport.width}-${viewport.height}.png`,
    });
    await page
      .getByRole('button', { name: 'Scroll to the next section' })
      .focus();
    await page
      .getByRole('button', { name: 'Scroll to the next section' })
      .press('Enter');
    await expect
      .poll(() =>
        page
          .locator('picture:not([aria-hidden="true"]) img')
          .getAttribute('alt'),
      )
      .toContain('Finca');
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect(
      page.getByRole('button', { name: 'Scroll to top' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Scroll to top' }).click();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeLessThan(4);
    expect(errors).toEqual([]);
  });
}
