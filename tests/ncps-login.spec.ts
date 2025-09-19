import { test, expect } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';
import { getConfig, getAuthUrl } from '../utils/config';

const config = getConfig();

test.describe('NCPS User Type Selection', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer default timeout
    test.setTimeout(config.timeouts.navigation);

    // Navigate to the NCPS page with basic auth
    await page.goto(getAuthUrl(config), {
      waitUntil: 'networkidle',
      timeout: config.timeouts.navigation
    });
  }
  );

  test('should display all user type options correctly', async ({ page }) => {
    // Log page content for debugging
    console.log('Page URL:', page.url());
    const content = await page.content();
    console.log('Page content:', content.substring(0, 500) + '...');
    
    // Wait for any one of the expected elements to be visible to confirm page load
    await page.waitForSelector('text="PET Student"', { timeout: 30000 });

    // Look for all expected user type options
    const expectedOptions = [
      'PET Student',
      'CET Student',
      'HS Staff',
      'Clinical Staff'
    ];

    // Verify each option exists
    for (const optionText of expectedOptions) {
      const element = page.getByText(optionText, { exact: true });
      await expect(element).toBeVisible();
    }

    // Take a screenshot for verification
    await page.screenshot({
      path: `./test-results/user-type-selection-${page.viewportSize()?.width}x${page.viewportSize()?.height}.png`,
      fullPage: true
    });
  });

  test('should have proper layout for each viewport', async ({ page }) => {
    // Wait for the page to be ready
    await page.waitForSelector('text="PET Student"', { timeout: 30000 });

    // Check if elements are properly laid out
    // This will help verify the responsive design
    const container = page.locator('body'); // Adjust this selector based on your actual page structure
    await expect(container).toBeVisible();

    // Take a screenshot with viewport size in filename
    await page.screenshot({
      path: `./test-results/layout-test-${page.viewportSize()?.width}x${page.viewportSize()?.height}.png`,
      fullPage: true
    });
  });
});

test.describe('NCPS Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the NCPS page with basic auth
    await page.goto(getAuthUrl(config), {
      waitUntil: 'networkidle',
      timeout: config.timeouts.navigation
    });
  });

  test('should have no accessibility violations', async ({ page }) => {
    await injectAxe(page);
    await checkA11y(page);
  });
});
