// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('Verify error message for invalid login', async ({ page }) => {
  // Navigate to the OrangeHRM login page
  // Navigate the browser to the target test page URL.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  // verify the login form is visible on the page
  // Assert that the expected element is visible on the page.
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  // Attempt to log in with invalid credentials
  //enter username
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Username').fill('Admin',{delay:8000});
  //enter password
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Password').fill('invalid_password',{delay:5000});
  //click login button
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Login' }).click();
  //store error message in a variable
  // Store a value, element handle, or generated data for later use.
  const errorMessage = await page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']").textContent();
  //print error message in console
  // Log information to the console for debugging or verification.
  console.log("Error message displayed:", errorMessage);
  //assert the error message is correct
  // Assert the exact text of the element matches the expected string.
  await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText('Invalid credentials');
  //validate error message part of the string
  // Assert a page condition with Playwright matchers.
  await expect(errorMessage.includes('Invalid')).toBeTruthy();
  //validate exact error message
  // Assert a page condition with Playwright matchers.
  await expect(errorMessage).toBe('Invalid credentials');
  //another way to validate exact error message
  // Assert a page condition with Playwright matchers.
  await expect(errorMessage==='Invalid credentials').toBeTruthy();
});
