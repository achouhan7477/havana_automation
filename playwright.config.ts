import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000,
  use: {
    ignoreHTTPSErrors: true,
    navigationTimeout: 60 * 1000,
    actionTimeout: 30 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
