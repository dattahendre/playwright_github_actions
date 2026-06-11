// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://demowebshop.tricentis.com/');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  //click on home page button computers
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Computers' }).first().click();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Desktops' }).first().click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.locator('.item-box').first()).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Build your own cheap computer Build it Availability: In stock Free shipping 841')).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('textbox', { name: 'Qty:' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Qty:' }).fill('2');
  // Click the element to trigger the next user action.
  await page.locator('#add-to-cart-button-72').click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('The product has been added to')).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Shopping cart (2)' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Shopping cart (2)' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Checkout' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Please accept the terms of')).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'close' }).click();
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
  // Assert that the expected element is visible on the page.
  await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again. No customer')).toBeVisible();
  //close the browser 
  // Close the current page or browser at the end of the test.
  await page.close();
});
