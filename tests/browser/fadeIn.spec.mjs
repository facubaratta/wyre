import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`sections fade in again after leaving the viewport at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await expect(page.locator('#hero')).toBeVisible();
    await page.waitForTimeout(650);
    expect(
      await page
        .locator('#hero')
        .evaluate((el) => getComputedStyle(el).transform),
    ).toBe('none');
    await page.locator('#crecimiento-real').scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await expect(page.locator('#crecimiento-real')).toHaveCSS('opacity', '1');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator('#crecimiento-real')).toHaveCSS('opacity', '0');
    await page.locator('#crecimiento-real').scrollIntoViewIfNeeded();
    await expect(page.locator('#crecimiento-real')).toHaveCSS('opacity', '1');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(async () => {
      for (
        let y = 0;
        y < document.documentElement.scrollHeight;
        y += innerHeight / 2
      ) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    });
    await page.waitForTimeout(650);
    await page.screenshot({
      path: `/tmp/wyre-fade-${viewport.width}.png`,
      fullPage: true,
    });
  });
}
