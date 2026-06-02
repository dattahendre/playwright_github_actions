import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  //click on home page button computers
  await page.getByRole('link', { name: 'Computers' }).first().click();
  await page.getByRole('link', { name: 'Desktops' }).first().click();
  await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
  await expect(page.locator('.item-box').first()).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.getByText('Build your own cheap computer Build it Availability: In stock Free shipping 841')).toBeVisible();
  await page.getByRole('textbox', { name: 'Qty:' }).click();
  await page.getByRole('textbox', { name: 'Qty:' }).fill('2');
  await page.locator('#add-to-cart-button-72').click();
  await expect(page.getByText('The product has been added to')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Shopping cart (2)' })).toBeVisible();
  await page.getByRole('link', { name: 'Shopping cart (2)' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByText('Please accept the terms of')).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  await page.locator('#termsofservice').check();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  await page.getByText('Returning Customer').click();
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('datta.ssl33@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('Datta@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again. No customer')).toBeVisible();
  //close the browser 
  await page.close();
});