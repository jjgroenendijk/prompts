import { test, expect } from '@playwright/test';

const isDark = (page) =>
  page.evaluate(() => document.documentElement.classList.contains('dark'));

const bodyBackground = (page) =>
  page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);

const backgroundVar = (page) =>
  page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
  );

// Pin the OS preference so the `system` default theme resolves to light
// deterministically, regardless of the runner's color-scheme.
test.use({ colorScheme: 'light' });

test.describe('Theme Toggle', () => {
  test('starts in light mode (no .dark class)', async ({ page }) => {
    await page.goto('./');
    expect(await isDark(page)).toBe(false);
  });

  test('switches to dark mode when the toggle is clicked', async ({ page }) => {
    await page.goto('./');

    const lightBg = await bodyBackground(page);

    await page.click('[title="Toggle Theme"]');
    await expect.poll(() => isDark(page)).toBe(true);

    // The body background has a CSS transition, so poll until it settles.
    await expect.poll(() => bodyBackground(page)).not.toBe(lightBg);
  });

  test('persists the theme after a page reload', async ({ page }) => {
    await page.goto('./');

    await page.click('[title="Toggle Theme"]');
    await expect.poll(() => isDark(page)).toBe(true);

    await page.reload();
    await expect.poll(() => isDark(page)).toBe(true);
  });

  test('changes the --background CSS variable with the theme', async ({ page }) => {
    await page.goto('./');

    const lightVar = await backgroundVar(page);

    await page.click('[title="Toggle Theme"]');
    await expect.poll(() => isDark(page)).toBe(true);

    const darkVar = await backgroundVar(page);
    expect(darkVar).not.toBe(lightVar);
  });
});
