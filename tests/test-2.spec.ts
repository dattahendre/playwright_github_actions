// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // veify the title of the page
  // Verify the page title matches the expected value or pattern.
  await expect(page).toHaveTitle(/OrangeHRM/);
  //click on username to fill data
  // Click the element to trigger the next user action.
  await page.getByPlaceholder('Username').click();
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Username').fill('Admin',{delay:2000});
  //click on password to fill data
  // Click the element to trigger the next user action.
  await page.getByPlaceholder('Password').click();
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Password').fill('admin123',{delay:2000});
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Login' }).click();

  //await expect(page).toHaveURL(/.*dashboard.*/);
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Admin' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('textbox').nth(1).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox').nth(1).fill('Admin',{delay:2000});
  // Click the element to trigger the next user action.
  await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
  // Click the element to trigger the next user action.
  await page.getByRole('listbox').getByText('Admin').click();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Search' }).click();
  // Assert the element or page contains the expected text.
  await expect(page.getByRole('table')).toContainText('Admin');
// Click the element to trigger the next user action.
await page.getByRole('img', { name: 'profile picture' }).click();
  //await page.locator('span').filter({ hasText: 'manda user' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  // Assert the element or page contains the expected text.
  await expect(page.getByRole('heading')).toContainText('Login');

});
