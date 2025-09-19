import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },

  projects: [
    // Desktop viewports
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // iPhone 14 Pro viewport
    {
      name: 'chromium-iphone14-pro',
      use: {
        ...devices['iPhone 14 Pro'],
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 3,
        hasTouch: true,
        isMobile: true,
      },
    },
    // iPad 10th generation viewport
    {
      name: 'chromium-ipad-10',
      use: {
        ...devices['iPad Air'],
        viewport: { width: 1180, height: 820 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
});