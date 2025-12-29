import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: 'html',
 
  use: {
    browserName: "chromium",
    headless: false,
    trace: 'on',
    screenshot: 'on',
  },
});
