// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://demowebshop.tricentis.com/');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Computers' }).first().click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Desktops' }).first().click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Desktop PC with CDRW', exact: true })).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Electronics' }).first()).toBeVisible();
  
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Electronics' }).first().click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Cell phones', description: 'Show products in category Cell phones', exact: true }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Shopping cart (1)' }).click();
});
