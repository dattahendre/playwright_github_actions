// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://www.wellpeople.com/?srsltid=AfmBOoqfeoCEVgf0kOpFYUzO3v1IP521OpR0ENZDUCcM4MR6tCxlAuVS');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('button', { name: 'Accept All Cookies' })).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Best Sellers' })).toBeVisible();
  //click on home page button best sellers

  // Click the element to trigger the next user action.
  await page.getByRole('link', { name: 'Best Sellers' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('button', { name: 'Search' }).click();
  // Click the element to trigger the next user action.
  await page.getByRole('searchbox', { name: 'Search' }).click();

  // Click the element to trigger the next user action.
  await page.getByRole('searchbox', { name: 'Search' }).click();
  // Fill the target input field with the specified value.
  await page.getByRole('searchbox', { name: 'Search' }).fill('Expressionist Curling Mascara');
 
  // Click the element to trigger the next user action.
  await page.locator('#predictive-search-form > svg').click();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('listitem').filter({ hasText: 'expressionist curling mascara' })).toBeVisible();
  // Assert that the expected element is visible on the page.
  await expect(page.locator('.product-list > product-card > .product-card__figure > .product-card__media').first()).toBeVisible();
  // Click the element to trigger the next user action.
  await page.getByRole('listitem').filter({ hasText: 'expressionist curling mascara' }).click();
  //close the browser
  // Close the current page or browser at the end of the test.
  page.close();  
});
