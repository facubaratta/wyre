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
      await page.evaluate(() =>
        performance
          .getEntriesByType('resource')
          .some((entry) =>
            /assets\/(AiExample|Portfolio)-.*\.js/.test(entry.name),
          ),
      ),
    ).toBe(false);
    const before = await page.locator('#decisiones-humanas').boundingBox();
    await page.locator('#decisiones-humanas').scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() =>
          performance
            .getEntriesByType('resource')
            .some(
              (entry) =>
                /assets\/AiExample-.*\.js/.test(entry.name) &&
                !document.querySelector(
                  `script[src="${new URL(entry.name).pathname}"]`,
                ),
            ),
        ),
      )
      .toBe(true);
    await expect(page.locator('#ai-example figure')).toBeVisible();
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

test('content and styling are available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#human-heading')).toHaveText('Decisiones Humanas');
  await expect(page.locator('#growth-heading')).toHaveText('Crecimiento real');
  await expect(page.locator('#ai-example figure')).toHaveCount(1);
  expect(
    await page
      .locator('#hero')
      .evaluate((element) => getComputedStyle(element).display),
  ).toBe('flex');
  const contact = page
    .locator('#hero-actions')
    .getByRole('link', { name: 'Hablemos' });
  const contactUrl = new URL(await contact.getAttribute('href'));
  expect(contactUrl.origin + contactUrl.pathname).toBe(
    'https://wa.me/5491133610131',
  );
  expect(contactUrl.searchParams.get('text')).toBe(
    'Hola, me interesa contactar a Wyre',
  );
  const service = page.getByRole('link', {
    name: 'Me interesa: Sitio institucional. Ver opciones de contacto',
  });
  const serviceUrl = new URL(await service.getAttribute('href'));
  expect(serviceUrl.origin + serviceUrl.pathname).toBe(
    'https://wa.me/5491133610131',
  );
  expect(serviceUrl.searchParams.get('text')).toBe(
    'Hola Wyre, me interesa un sitio institucional.',
  );
  // Intercept the external handoff so the test never opens a real contact service.
  await page.route('https://wa.me/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<p>Contact handoff</p>' }),
  );
  await contact.click();
  await expect(page).toHaveURL(contactUrl.href);
  await expect(page.getByText('Contact handoff')).toBeVisible();
  await context.close();
});

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
  expect(errors).toEqual([]);
});

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
    await page.mouse.wheel(0, -viewport.height * 3);
    await expect(
      page.locator('picture:not([aria-hidden="true"]) img'),
    ).toHaveAttribute('alt', /Club Zurich/);
    expect(errors).toEqual([]);
  });
}
