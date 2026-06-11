// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('Flipkart search and open product', async ({ page, browser }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://www.flipkart.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  // close login modal if present
  // Store a value, element handle, or generated data for later use.
  const closeBtn = page.getByRole('button', { name: '✕' });
  if (await closeBtn.count() > 0) {
    // Click the element to trigger the next user action.
    await closeBtn.click();
  }

  // Store a value, element handle, or generated data for later use.
  const searchBox = page.getByRole('textbox', { name: 'Search for Products, Brands' });
  // Click the element to trigger the next user action.
  await searchBox.click();
  // Fill the target input field with the specified value.
  await searchBox.fill('iphone 14');
  // Send a keyboard action to the currently focused element.
  await searchBox.press('Enter');

  // wait for results to populate
  // Assert the element or page contains the expected text.
  await expect(page.locator('body')).toContainText('iPhone', { timeout: 20000 });

  // open the first matching product in a new page and verify a price is shown
  // Store a value, element handle, or generated data for later use.
  const [productPage] = await Promise.all([
    page.waitForEvent('popup'),
    // Click the element to trigger the next user action.
    page.locator('a:has-text("Apple iPhone 14")').first().click(),
  ]);

  await productPage.waitForLoadState('domcontentloaded');
  // Assert the element or page contains the expected text.
  await expect(productPage.locator('body')).toContainText('₹');
  await productPage.close();
  // Close the current page or browser at the end of the test.
  await browser.close();
});

