import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wellpeople.com/?srsltid=AfmBOoqfeoCEVgf0kOpFYUzO3v1IP521OpR0ENZDUCcM4MR6tCxlAuVS');
  await expect(page.getByRole('button', { name: 'Accept All Cookies' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await expect(page.getByRole('link', { name: 'Best Sellers' })).toBeVisible();
  //click on home page button best sellers

  await page.getByRole('link', { name: 'Best Sellers' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();

  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Expressionist Curling Mascara');
 
  await page.locator('#predictive-search-form > svg').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'expressionist curling mascara' })).toBeVisible();
  await expect(page.locator('.product-list > product-card > .product-card__figure > .product-card__media').first()).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: 'expressionist curling mascara' }).click();
    
});