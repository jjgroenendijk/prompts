import { test, expect } from '@playwright/test';

test.describe('Rule selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('shows nested categories in the browser', async ({ page }) => {
    // `code` holds `quality`, `powershell`, and `scripts` subcategories
    await expect(page.getByRole('button', { name: /^Code\b/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Quality\b/ })).toBeVisible();
  });

  test('token meter tracks the selection', async ({ page }) => {
    const meter = page.getByTestId('token-meter').first();
    await expect(meter).toContainText('~0');

    await page.getByRole('heading', { name: 'No Emojis' }).click();

    await expect(meter).not.toContainText('~0 /');
  });

  test('copied output carries rule text without frontmatter', async ({ page }) => {
    await page.getByRole('heading', { name: 'No Emojis' }).click();

    const output = page.locator('textarea[readonly]').first();
    await expect(output).toContainText('## Writing');
    await expect(output).toContainText('NEVER use emojis');

    // Frontmatter must never reach the copyable document
    await expect(output).not.toContainText('type: Rule');
    await expect(output).not.toContainText('---');
  });

  test('selecting a parent category selects its subcategories', async ({ page }) => {
    const quality = page.getByRole('button', { name: /^Quality\b/ });
    const countText = await quality.textContent();
    const qualityCount = Number(countText.replace(/\D/g, ''));

    // The checkbox sits next to the category label
    await page.getByRole('button', { name: /^Code\b/ }).locator('xpath=../div[1]').click();

    const activeRules = page.locator('text=Active Rules').first();
    const active = Number((await activeRules.textContent()).replace(/\D/g, ''));
    expect(active).toBeGreaterThan(qualityCount);
  });
});
