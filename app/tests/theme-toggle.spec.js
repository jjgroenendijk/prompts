import { test, expect } from '@playwright/test';

// Typewriter palette, mirrored from app/globals.css
const THEME_COLORS = {
  light: {
    background: 'rgb(247, 245, 240)', // #F7F5F0
    foreground: 'rgb(14, 13, 11)',    // #0E0D0B
    variable: '#F7F5F0',
  },
  dark: {
    background: 'rgb(13, 16, 22)',    // #0D1016
    foreground: 'rgb(237, 231, 220)', // #EDE7DC
    variable: '#0D1016',
  }
};

test.describe('Theme Toggle', () => {
  test('should start in light mode with Nord colors', async ({ page }) => {
    await page.goto('./');

    // Check body background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    expect(bgColor).toBe(THEME_COLORS.light.background);
  });

  test('should switch to dark mode when toggle is clicked', async ({ page }) => {
    await page.goto('./');

    // Get initial state
    const initialBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Click toggle button
    await page.click('[title="Toggle Theme"]');

    // Wait for CSS transition
    await page.waitForTimeout(300);

    // Get new state
    const newBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Colors should be different
    expect(newBg).not.toBe(initialBg);
    expect(newBg).toBe(THEME_COLORS.dark.background);
  });

  test('should persist theme after page reload', async ({ page }) => {
    await page.goto('./');

    // Toggle to dark
    await page.click('[title="Toggle Theme"]');
    await page.waitForTimeout(300);

    // Verify dark mode
    const darkBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(darkBg).toBe(THEME_COLORS.dark.background);

    // Reload
    await page.reload();
    await page.waitForTimeout(300);

    // Should still be dark
    const afterReloadBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(afterReloadBg).toBe(THEME_COLORS.dark.background);
  });

  test('should verify .dark class is applied to HTML element', async ({ page }) => {
    await page.goto('./');

    // Initially should not have dark class
    const initialDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });

    // Toggle
    await page.click('[title="Toggle Theme"]');
    await page.waitForTimeout(100);

    // Should now have dark class
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);
  });

  test('should verify CSS variables change with theme', async ({ page }) => {
    await page.goto('./');

    // Get light mode CSS variable
    const lightVar = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--background').trim();
    });

    // Toggle to dark
    await page.click('[title="Toggle Theme"]');
    await page.waitForTimeout(300);

    // Get dark mode CSS variable
    const darkVar = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--background').trim();
    });

    // Variables should be different
    expect(darkVar).not.toBe(lightVar);
    // Browsers normalize custom property values to lowercase
    expect(darkVar.toLowerCase()).toBe(THEME_COLORS.dark.variable.toLowerCase());
    expect(lightVar.toLowerCase()).toBe(THEME_COLORS.light.variable.toLowerCase());
  });
});
