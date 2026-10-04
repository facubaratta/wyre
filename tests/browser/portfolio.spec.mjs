import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`portfolio advances through every project with normal scrolling at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const names = [
      'Health & Harmony',
      'Finca Don Clemente',
      'ProTennisSquash',
      'Club Zurich',
      'Time Magnitude',
    ];
    const start = await page
      .locator('#crecimiento-real')
      .evaluate(
        (element) => element.getBoundingClientRect().top + window.scrollY,
      );
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      start + viewport.height * 0.05,
    );
    for (const [index, name] of names.entries()) {
      if (index) await page.mouse.wheel(0, viewport.height);
      const image = page.locator('picture:not([aria-hidden="true"]) img');
      await expect(image).toHaveAttribute('alt', `${name} website screenshot`);
      await expect
        .poll(() =>
          image.evaluate(
            (element) => element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await page.screenshot({
        path: `test-results/project-${viewport.width}-${index}.png`,
      });
    }
    await page.mouse.wheel(0, viewport.height * 2);
    await expect(page.locator('picture:not([aria-hidden="true"])')).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Scroll to top' }),
    ).toBeVisible();
    // Wheel delivery is asynchronous; finish the downward scroll before
    // reversing, then land inside Club Zurich rather than on its stage boundary.
    await expect
      .poll(() =>
        page.evaluate(() =>
          Math.abs(
            window.scrollY -
              (document.documentElement.scrollHeight - window.innerHeight),
          ),
        ),
      )
      .toBeLessThanOrEqual(2);
    await page.mouse.wheel(0, -viewport.height * 2.95);
    await expect(
      page.locator('picture:not([aria-hidden="true"]) img'),
    ).toHaveAttribute('alt', /Club Zurich/);
    expect(errors).toEqual([]);
  });
}
