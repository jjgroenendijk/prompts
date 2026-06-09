import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './lib/config.js';

// The site is served under the basePath derived from config.yml's baseUrl
// (e.g. "/prompts"). Build the baseURL so tests can navigate with relative
// paths (page.goto('/')) regardless of how a fork configures its baseUrl.
const config = await getConfig();
const basePath = config.site.basePath || '';
const baseURL = `http://localhost:3000${basePath}/`;

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
