// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';
// 1. Import your Screenshot POM class (adjust path if your folders are structured differently)
const { ScreenshotPage } = require('./pages/ScreenshotPage');
// Define the test case and assign a descriptive name.
test('Verify error message for invalid login', async ({ page }) => {
  // Navigate to the OrangeHRM login page
  // Navigate the browser to the target test page URL.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
// Instantiate the screenshot class
    const screenshotPage = new ScreenshotPage(page);
  // verify the login form is visible on the page
  // Assert that the expected element is visible on the page.
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await screenshotPage.takeRandomScreenshot(true);
  // Attempt to log in with invalid credentials
  //enter username
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Username').fill('Admin',{delay:8000});
  await screenshotPage.takeRandomScreenshot(true);
  //enter password
  // Fill the target input field with the specified value.
  await page.getByPlaceholder('Password').fill('invalid_password',{delay:5000});
  await screenshotPage.takeRandomScreenshot(true);
  //click login button
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Login' }).click();
  //store error message in a variable
  await screenshotPage.takeRandomScreenshot(true);
  // Store a value, element handle, or generated data for later use.
  const errorMessage = await page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']").textContent();
  //print error message in console
  // Log information to the console for debugging or verification.
  await screenshotPage.takeRandomScreenshot(true);
  console.log("Error message displayed:", errorMessage);
  await screenshotPage.takeRandomScreenshot(true);
  //assert the error message is correct
  // Assert the exact text of the element matches the expected string.
  await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText('Invalid credentials');
  //validate error message part of the string
  // Assert a page condition with Playwright matchers.
  await screenshotPage.takeRandomScreenshot(true);
  await expect(errorMessage.includes('Invalid')).toBeTruthy();
  await screenshotPage.takeRandomScreenshot(true);
  //validate exact error message
  // Assert a page condition with Playwright matchers.
  await expect(errorMessage).toBe('Invalid credentials');
  await screenshotPage.takeRandomScreenshot(true);
  //another way to validate exact error message
  // Assert a page condition with Playwright matchers.
  await expect(errorMessage==='Invalid credentials').toBeTruthy();
  await screenshotPage.takeRandomScreenshot(true);
  await page.close();
});
