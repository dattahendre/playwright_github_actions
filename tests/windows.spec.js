// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Playground' })).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Modal & Overlays' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Window' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Window' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Window Form', { exact: true })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Open window form' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Subject:' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Subject:' }).fill('english');
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Text:' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Text:' }).fill('math');
  // Click the element to trigger the next user action.
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  // Click the element to trigger the next user action.
  await page.locator('div').filter({ hasText: 'Nick Jones' }).nth(3).click();
  // Click the element to trigger the next user action.
  await page.getByTitle('Log out').click();
  // close the browser after test case execution
  // Close the current page or browser at the end of the test.
  await page.close();
});
