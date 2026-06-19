// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://nodejs.org/en/download/current');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  // Assert the element or page contains the expected text.
  await expect(page.locator('h1')).toContainText('Download Node.js®');
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Blog', exact: true }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Everything' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Docs' }).click();
  // Click the element to trigger the next user action.
  await page.locator('#column2').getByRole('link', { name: 'Assertion testing' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Buffer' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Node.js' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Run JavaScript Everywhere' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Learn', exact: true }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Introduction to Node.js' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'How much JavaScript do you' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Data Types' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'JavaScript data types and' })).toBeVisible();
  //close the browser after test case execution
  await page.close();
});
