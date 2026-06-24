// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';
// 1. Import your Screenshot POM class (adjust path if your folders are structured differently)
const { ScreenshotPage } = require('../pages/ScreenshotPage');
// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
   // Instantiate the screenshot class
    const screenshotPage = new ScreenshotPage(page);
  // Navigate the browser to the target test page URL.
  await page.goto('https://demowebshop.tricentis.com/');
  // 4. Take screenshot after open URL
    await screenshotPage.takeRandomScreenshot(true);
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  //click on home page button computers
  // Click the element to trigger the next user action.
    await screenshotPage.takeRandomScreenshot(true);
  await page.getByRole('link', { name: 'Computers' }).first().click();
    await screenshotPage.takeRandomScreenshot(true);
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Desktops' }).first().click();
    await screenshotPage.takeRandomScreenshot(true);
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
    await screenshotPage.takeRandomScreenshot(true);
  // Assert that the expected element is visible on the page.
  await expect(page.locator('.item-box').first()).toBeVisible();
    await screenshotPage.takeRandomScreenshot(true);
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
   await screenshotPage.takeRandomScreenshot(true);
  // Assert that the expected element is visible on the page.
  //await expect(page.getByText('Build your own cheap computer Build it Availability: In stock Free shipping 841')).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Qty:' }).click();
   await screenshotPage.takeRandomScreenshot(true);
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Qty:' }).fill('2');
   await screenshotPage.takeRandomScreenshot(true);
  // Click the element to trigger the next user action.
  await page.locator('#add-to-cart-button-72').click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('The product has been added to')).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Shopping cart (2)' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Shopping cart (2)' }).click();
   await screenshotPage.takeRandomScreenshot(true);
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Checkout' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Please accept the terms of')).toBeVisible();
   await screenshotPage.takeRandomScreenshot(true);
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'close' }).click();
   await screenshotPage.takeRandomScreenshot(true);
  // Toggle the checkbox or option input.
  await page.locator('#termsofservice').check();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Checkout' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByText('Returning Customer').click();
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Email:' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Email:' }).fill('datta.ssl33@gmail.com');
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Password:' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Password:' }).fill('Datta@123');
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Log in' }).click();
   await screenshotPage.takeRandomScreenshot(true);
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again. No customer')).toBeVisible();
   await screenshotPage.takeRandomScreenshot(true);
  //close the browser 
  // Close the current page or browser at the end of the test.
  
});
