import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
]) {
  test(`closing contact content is reachable at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() =>
      document.documentElement.style.getPropertyValue('--header-height'),
    );
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator('#hero-actions')
      .getByRole('link', { name: 'Hablemos' })
      .click();
    const closing = page.locator('section[aria-labelledby="closing-heading"]');
    await expect(closing).toHaveAttribute('aria-hidden', 'false');
    await expect(closing).not.toHaveAttribute('inert');
    for (const locator of [
      page.locator('#closing-heading'),
      closing.getByRole('link', { name: /^WhatsApp:/ }),
      closing.getByRole('link', { name: /^Mail:/ }),
    ]) {
      await locator.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          locator.evaluate((element) => {
            const bounds = element.getBoundingClientRect();
            const panel = element.closest('section').getBoundingClientRect();
            const hit = document.elementFromPoint(
              bounds.left + bounds.width / 2,
              bounds.top + bounds.height / 2,
            );
            return (
              bounds.top >= Math.max(panel.top, 0) - 1 &&
              bounds.bottom <= Math.min(panel.bottom, innerHeight) + 1 &&
              bounds.left >= Math.max(panel.left, 0) - 1 &&
              bounds.right <= Math.min(panel.right, innerWidth) + 1 &&
              element.contains(hit)
            );
          }),
        )
        .toBe(true);
    }
    expect(
      await closing.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/closing-${viewport.width}-${viewport.height}.png`,
    });
  });
}
