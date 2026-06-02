import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wellpeople.com/?srsltid=AfmBOoqfeoCEVgf0kOpFYUzO3v1IP521OpR0ENZDUCcM4MR6tCxlAuVS');
  await expect(page.getByRole('button', { name: 'Accept All Cookies' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await expect(page.getByRole('link', { name: 'Best Sellers' })).toBeVisible();
  //click on home page button best sellers
  await page.getByRole('link', { name: 'Best Sellers' }).click();
  await expect(page.getByRole('link', { name: 'Expressionist Curling Mascara', exact: true })
).toBeVisible();
  //await expect(page.getByRole('link', { name: 'Expressionist Curling Mascara' })).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.getByRole('button', { name: 'Cart', exact: true })).toBeVisible();
  
await page.getByRole('button', { name: 'Checkout', exact: true }).click();
//verify the checkout page
await page.getByText('Expressionist Curling Mascara').toString().includes('Expressionist Curling Mascara');
//verify product price is $20.00
await page.getByText('$20.00').toString().includes('$20.00');
//close the browser
await page.close();
  
  
});