import { test, expect } from '@playwright/test';

// A snippet that is known to exist in the repo (snippets/git-commits/
// conventional-commits.md -> "Conventional Commits").
const SNIPPET_TITLE = 'Conventional Commits';

// The output pane is rendered twice: the inline desktop pane (`md:block`) and
// a mobile bottom-sheet drawer (`md:hidden`). Scope output assertions to the
// desktop pane so locators resolve to a single element.
const outputPane = (page) => page.locator('div.md\\:block');

test.describe('Prompt Builder app', () => {
  test('renders the header and an empty output state', async ({ page }) => {
    await page.goto('./');

    await expect(page.locator('h1')).toHaveText('Prompt Builder');

    const pane = outputPane(page);
    await expect(pane.getByText('0 Active Rules')).toBeVisible();
    await expect(pane.getByText('Ready to Compose')).toBeVisible();
  });

  test('selecting a snippet adds it to the output', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('heading', { name: SNIPPET_TITLE }).click();

    const pane = outputPane(page);
    await expect(pane.getByText('1 Active Rules')).toBeVisible();

    // The generated output appears in the read-only textarea.
    const output = pane.locator('textarea[readonly]');
    await expect(output).toBeVisible();
    await expect(output).toHaveValue(/## Git Commits/);
  });

  test('deselecting a snippet clears it from the output', async ({ page }) => {
    await page.goto('./');

    const snippet = page.getByRole('heading', { name: SNIPPET_TITLE });
    const pane = outputPane(page);

    await snippet.click();
    await expect(pane.getByText('1 Active Rules')).toBeVisible();

    await snippet.click();
    await expect(pane.getByText('0 Active Rules')).toBeVisible();
  });

  test('the Clear button removes all selections', async ({ page }) => {
    await page.goto('./');

    const pane = outputPane(page);
    await page.getByRole('heading', { name: SNIPPET_TITLE }).click();
    await expect(pane.getByText('1 Active Rules')).toBeVisible();

    await pane.getByRole('button', { name: 'Clear' }).click();
    await expect(pane.getByText('0 Active Rules')).toBeVisible();
    await expect(pane.getByText('Ready to Compose')).toBeVisible();
  });

  test('search filters the snippet list', async ({ page }) => {
    await page.goto('./');

    // Everything is visible before searching.
    await expect(page.getByRole('heading', { name: SNIPPET_TITLE })).toBeVisible();

    await page.getByPlaceholder('Search rules...').fill('conventional');

    await expect(page.getByRole('heading', { name: SNIPPET_TITLE })).toBeVisible();
    // A snippet from an unrelated category should be filtered out.
    await expect(page.getByRole('heading', { name: 'Abbreviate Prose' })).toHaveCount(0);
  });

  test('copies the generated rules to the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('./');

    await page.getByRole('heading', { name: SNIPPET_TITLE }).click();

    const pane = outputPane(page);
    const output = pane.locator('textarea[readonly]');
    const expected = await output.inputValue();

    await pane.getByRole('button', { name: 'Copy Rules' }).click();

    // The button confirms the copy by switching to "Copied".
    await expect(pane.getByRole('button', { name: 'Copied' })).toBeVisible();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(expected);
  });
});
