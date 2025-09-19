import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://playwright.dev/');

  // Expect a title to contain a specific string
  await expect(page).toHaveTitle(/Playwright/);

  // Create a locator and click
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect the URL to contain docs
  await expect(page).toHaveURL(/.*docs/);
});