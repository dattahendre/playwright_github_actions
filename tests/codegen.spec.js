// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate to the application's login page
  // Navigate the browser to the target test page URL.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Focus the Username field
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Username' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Enter the username
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Focus the Password field
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Password' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Enter the password
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });

  // Submit the login form
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Login' }).click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Open the global Search box and type 'Admin'
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Search' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Search' }).fill('Admin');

  // Navigate to the 'Admin' section from search results
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Admin' }).click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Interact with the second textbox on the page (likely a filter input)
  // Click the element to trigger the next user action.
  await page.getByRole('textbox').nth(1).click();
  // Apply text filter value
  // Fill the target input field with the specified value.
  await page.getByRole('textbox').nth(1).fill('Admin');
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });

  // Open the first dropdown and select the 'Admin' role
  // Click the element to trigger the next user action.
  await page.getByText('-- Select --').first().click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Click the element to trigger the next user action.
  await page.getByRole('option', { name: 'Admin' }).click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Use the autocomplete/hint field to search for a specific user
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Eric ');
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Choose the suggested user from the autocomplete list
  // Click the element to trigger the next user action.
  await page.getByRole('option', { name: 'Eric akhil Cantona' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });

  // Change status filter to 'Enabled'
  // Click the element to trigger the next user action.
  await page.getByText('-- Select --').click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Click the element to trigger the next user action.
  await page.getByRole('listbox').getByText('Enabled').click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Apply search with the selected filters
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Search' }).click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Select the result that matches 'Eric Cantona'
  // Click the element to trigger the next user action.
  await page.locator('span').filter({ hasText: 'Eric Cantona' }).click();
// Capture a screenshot of the current browser state.
await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Open the user menu and log out
  // Click the element to trigger the next user action.
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/my-snapshot.png', fullPage: true });
  // Close the browser page after completing the test actions
  await page.close();
});
