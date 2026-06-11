// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Force a clean context to ensure you are on the login page
// Configure test-level fixtures or browser state before running the test.
test.use({ storageState: { cookies: [], origins: [] } });

// Define the test case and assign a descriptive name.
test('Enter username and password and click on login button', async ({ page }) => {
  // Navigate to the OrangeHRM login page
  // Navigate the browser to the target test page URL.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  // Fill the username field
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Username').fill('Admin');

  // Fill the password field
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Password').fill('admin123');

  // Take a screenshot after entering credentials
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/login-success.png' });

  // Click the Login button
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify the Dashboard heading is visible after login
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  //verify the URL after login
  // Store a value, element handle, or generated data for later use.
  const currentURL = await page.url();
  // Log information to the console for debugging or verification.
  console.log("Current URL after login:", currentURL);
  // Verify the browser navigated to the expected URL.
  await expect(page).toHaveURL(currentURL);
  //await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  // Take a screenshot of the dashboard
  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/login-dashboard.png' });

  // Find the Search input field
  // Store a value, element handle, or generated data for later use.
  const searchInput = page.getByPlaceholder('Search');

  // Click the Search input to focus it
  // Click the element to trigger the next user action.
  await searchInput.click();

  // Enter the search term 'Admin'
  // Fill the target input field with the specified value.
  await searchInput.fill('Admin');

  // Click the Admin link from the search results
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: /Admin/i }).click();

  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
  //enter username in search box
//
// Store a value, element handle, or generated data for later use.
const usernameInput = page.locator('input[class*="oxd-input"]').nth(1); // First input in the search form
// Click the element to trigger the next user action.
await usernameInput.click();
// Fill the target input field with the specified value.
await usernameInput.fill('Admin');
  
 // Click to open dropdown
 //await page.locator('//div[contains(@class,"oxd-select-text oxd-select-text--active")]').first().click();
  // Click the element to trigger the next user action.
  await page.getByText('-- Select --').first().click();
 
// Click the dropdown option "Admin" (inside the listbox)
// Click the element to trigger the next user action.
await page.getByRole('option', { name: 'Admin' }).click();
//enter the employee name in search box
// Click the element to trigger the next user action.
await page.getByPlaceholder('Type for hints...').click();
// Fill the target input field with the specified value.
await page.getByPlaceholder('Type for hints...').fill('new akhil user',{delay:1500});
//wait for the dropdown options to appear
// Wait briefly to allow UI updates or manual observation.
await page.waitForTimeout(4000);
//slect user from dropdown
// Click the element to trigger the next user action.
await page.getByRole('option', { name: 'new akhil user' }).first().click();

  // Capture a screenshot of the current browser state.
  await page.screenshot({ path: 'screenshot/login-search-admin.png' });
 //click on user pfofile icon for logout
 // Click the element to trigger the next user action.
 await page.locator("//span[@class='oxd-userdropdown-tab']") .click();
 //wait for 5 seconsds for the dropdown to appear
 // Wait briefly to allow UI updates or manual observation.
 await page.waitForTimeout(5000);
 //click on logout button
 // Click the element to trigger the next user action.
 await page.getByRole('menuitem', { name: 'Logout' }).click();


  
});
