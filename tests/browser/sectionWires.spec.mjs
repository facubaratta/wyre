import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 390, height: 1200 },
]) {
  test(`Y-tail wires extend left, bend downward, and follow scrolling at ${viewport.width}×${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('');
    await page.evaluate(() => document.fonts.ready);
    const end = await page.evaluate(
      () =>
        document.getElementById('presencia-web').getBoundingClientRect().top +
        scrollY -
        document.getElementById('site-header').getBoundingClientRect().height,
    );
    const wires = page.locator('[data-section-wires]');
    const titleOffset = () =>
      page.evaluate(
        () =>
          document.getElementById('section-title-web').getBoundingClientRect()
            .top -
          document.getElementById('presencia-web').getBoundingClientRect().top,
      );
    const initialTitleOffset = await titleOffset();
    const scroll = async (y) => {
      await page.evaluate((target) => scrollTo(0, target), y);
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(Math.round(y));
    };
    await expect(wires).toBeHidden();
    await scroll(end * 0.12);
    await expect(page.locator('[data-section-wire]')).toHaveCount(4);
    // Every new conductor touches the corresponding visible, clipped Y tail.
    const attachmentGap = () =>
      page.evaluate(() => {
        const glyph = document
          .querySelector('#hero-wordmark [data-logo-svg]')
          .getBoundingClientRect();
        const scale = glyph.width / 556.152;
        const svg = document.querySelector('[data-section-wires]');
        const gaps = [
          [42, 956],
          [45, 984],
          [48, 1012],
          [51, 1040],
        ].map(([x, y], index) => {
          const use = svg.querySelector(`[data-section-wire="${index}"]`);
          const path = document.getElementById(
            use.getAttribute('href').slice(1),
          );
          const start = new DOMPoint(
            path.getPointAtLength(0).x,
            path.getPointAtLength(0).y,
          ).matrixTransform(svg.getScreenCTM());
          return Math.hypot(
            start.x - glyph.left - x * scale,
            start.y - glyph.top - y * scale,
          );
        });
        return Math.max(...gaps);
      });
    await expect.poll(attachmentGap).toBeLessThan(0.1);
    await scroll(end * 0.5);
    await expect(wires).toHaveAttribute('data-wire-progress', /0\.49|0\.5/);
    expect(await titleOffset()).toBeCloseTo(initialTitleOffset, 1);
    await expect(page.locator('#section-title-web')).toHaveCSS(
      'transform',
      'none',
    );
    await scroll(end * 0.25);
    await expect(wires).toHaveAttribute('data-wire-progress', /0\.24|0\.25/);
    await scroll(0);
    await expect(wires).toBeHidden();
    await scroll(end);
    await expect(wires).toHaveAttribute('data-wire-progress', '1');
    await expect(page.locator('#section-globe')).toHaveCSS('opacity', '1');
    const rail = () =>
      page.evaluate(() => {
        const use = document.querySelector('[data-section-wire="0"]');
        const path = document.getElementById(use.getAttribute('href').slice(1));
        const start = path.getPointAtLength(0);
        const end = path.getPointAtLength(path.getTotalLength());
        return {
          top:
            path.getBBox().y +
            document
              .querySelector('[data-section-wires]')
              .getBoundingClientRect().top,
          startX: start.x,
          endX: end.x,
          startY: start.y,
          endY: end.y,
        };
      });
    const before = await rail();
    expect(before.endX).toBeLessThan(before.startX);
    expect(before.endY).toBeGreaterThan(before.startY);
    await scroll(Math.round(end) + 100);
    await expect
      .poll(async () => (await rail()).top)
      .toBeCloseTo(before.top - 100, 1);
    await scroll(end * 0.5);
    await expect(wires).toHaveAttribute('data-wire-progress', /0\.49|0\.5/);
    await scroll(0);
    await expect(wires).toBeHidden();
    await scroll(end * 0.12);
    await expect(page.locator('[data-section-wire]')).toHaveCount(4);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test('reduced motion skips the wire expansion and moving pulses', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await page.locator('#presencia-web').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-section-wires]')).toHaveCount(0);
  await expect(page.locator('#section-title-web')).toHaveCSS('opacity', '1');
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`wire joint stays attached during throttled native scrolling at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('');
    await page.evaluate(() => document.fonts.ready);
    const end = await page.evaluate(
      () =>
        document.getElementById('presencia-web').getBoundingClientRect().top +
        scrollY -
        document.getElementById('site-header').getBoundingClientRect().height,
    );
    await page.evaluate((y) => scrollTo(0, y), end * 0.3);
    const jointGap = () =>
      page.evaluate(() => {
        const svg = document.querySelector('[data-section-wires]');
        const path = svg.querySelector('[data-wire-path]');
        const local = path.getPointAtLength(0);
        const point = new DOMPoint(local.x, local.y).matrixTransform(
          svg.getScreenCTM(),
        );
        const glyph = document
          .querySelector('#hero-wordmark [data-logo-svg]')
          .getBoundingClientRect();
        return Math.abs(point.y - glyph.top - (956 * glyph.width) / 556.152);
      });
    await expect.poll(jointGap).toBeLessThan(0.1);
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.evaluate(() => {
      window.wireJointSamples = [];
      window.recordWireJoint = true;
      const record = () => {
        if (!window.recordWireJoint) return;
        const svg = document.querySelector('[data-section-wires]');
        const path = svg.querySelector('[data-wire-path]');
        const local = path.getPointAtLength(0);
        const point = new DOMPoint(local.x, local.y).matrixTransform(
          svg.getScreenCTM(),
        );
        const glyph = document
          .querySelector('#hero-wordmark [data-logo-svg]')
          .getBoundingClientRect();
        window.wireJointSamples.push(
          Math.abs(point.y - glyph.top - (956 * glyph.width) / 556.152),
        );
        requestAnimationFrame(record);
      };
      requestAnimationFrame(record);
    });
    try {
      await client.send('Input.synthesizeScrollGesture', {
        x: viewport.width / 2,
        y: viewport.height / 2,
        yDistance: -900,
        speed: 650,
        gestureSourceType: 'mouse',
      });
      const samples = await page.evaluate(() => {
        window.recordWireJoint = false;
        return window.wireJointSamples;
      });
      expect(samples.length).toBeGreaterThan(5);
      expect(Math.max(...samples)).toBeLessThan(0.1);
    } finally {
      await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    }
  });
}

test('wire pulses pause offscreen and resume after a hidden resize', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  await page.evaluate(() => document.fonts.ready);
  const belowSection = await page.evaluate(
    () =>
      document.getElementById('presencia-web').getBoundingClientRect().bottom +
      scrollY +
      100,
  );
  await page.evaluate((y) => scrollTo(0, y), belowSection);
  const wires = page.locator('[data-section-wires]');
  await expect(wires).toBeHidden();
  await expect
    .poll(() => wires.evaluate((svg) => svg.animationsPaused()))
    .toBe(true);
  await page.setViewportSize({ width: 430, height: 900 });
  const target = await page.evaluate(
    () =>
      (document.getElementById('presencia-web').getBoundingClientRect().top +
        scrollY) *
      0.5,
  );
  await page.evaluate((y) => scrollTo(0, y), target);
  await expect(wires).toBeVisible();
  await expect
    .poll(() => wires.evaluate((svg) => svg.animationsPaused()))
    .toBe(false);
  await expect
    .poll(() =>
      wires.evaluate((svg) =>
        svg.style.getPropertyValue('--wire-animation-state'),
      ),
    )
    .toBe('running');
});
