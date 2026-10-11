import { test, expect } from '@playwright/test';

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`normal flow and manual portfolio at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await expect(page.locator('#hero')).toBeVisible();
    await page.waitForTimeout(650);
    expect(await page.locator('#hero').evaluate(el => getComputedStyle(el).transform)).toBe('none');
    await page.locator('#crecimiento-real').scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const nav = page.getByRole('navigation', { name: 'Portfolio projects' });
    await expect(nav).toBeVisible();
    await expect(nav.locator('button').first()).toBeDisabled();
    await nav.locator('button').last().click();
    await expect(nav.locator('button').first()).toBeEnabled();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('#crecimiento-real').scrollIntoViewIfNeeded();
    await expect(nav.locator('button').first()).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 80));
      }
    });
    await page.waitForTimeout(650);
    await page.screenshot({ path: `/tmp/wyre-fade-${viewport.width}.png`, fullPage: true });
  });
}
