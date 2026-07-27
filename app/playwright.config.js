import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './lib/config.js';

// The app is served under the basePath derived from config.yml, not the root.
const config = await getConfig();
const baseURL = `http://localhost:3000${config.site.basePath}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    // Escape hatch for environments that ship a prebuilt Chromium instead of
    // the exact build this Playwright version downloads.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
