// @ts-check
// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('has title', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  // Verify the page title matches the expected value or pattern.
  await expect(page).toHaveTitle(/Playwright/);
});

// Define the test case and assign a descriptive name.
test('get started link', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

