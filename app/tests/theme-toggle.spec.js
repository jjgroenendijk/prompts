import { test, expect } from '@playwright/test';

// Nord color palette reference
const NORD_COLORS = {
  light: {
    background: 'rgb(236, 239, 244)', // #ECEFF4 (nord6)
    foreground: 'rgb(46, 52, 64)',    // #2E3440 (nord0)
  },
  dark: {
    background: 'rgb(46, 52, 64)',    // #2E3440 (nord0)
    foreground: 'rgb(236, 239, 244)', // #ECEFF4 (nord6)
  }
};

test.describe('Theme Toggle', () => {
  test('should start in light mode with Nord colors', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check body background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    expect(bgColor).toBe(NORD_COLORS.light.background);
  });

  test('should switch to dark mode when toggle is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000');

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
    expect(newBg).toBe(NORD_COLORS.dark.background);
  });

  test('should persist theme after page reload', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Toggle to dark
    await page.click('[title="Toggle Theme"]');
    await page.waitForTimeout(300);

    // Verify dark mode
    const darkBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(darkBg).toBe(NORD_COLORS.dark.background);

    // Reload
    await page.reload();
    await page.waitForTimeout(300);

    // Should still be dark
    const afterReloadBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(afterReloadBg).toBe(NORD_COLORS.dark.background);
  });

  test('should verify .dark class is applied to HTML element', async ({ page }) => {
    await page.goto('http://localhost:3000');

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
    await page.goto('http://localhost:3000');

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
    expect(darkVar).toBe('#2E3440');
    expect(lightVar).toBe('#ECEFF4');
  });
});
