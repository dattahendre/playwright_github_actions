// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://www.google.com/');
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('link', { name: 'Gmail' })).toBeVisible();
  // Assert the element or page contains the expected text.
  await expect(page.getByLabel('इमेज खोजें')).toContainText('Images');

  // Assert a page condition with Playwright matchers.
  await expect(page.locator('#gb')).toMatchAriaSnapshot(`
    - link "Gmail":
      - /url: https://mail.google.com/mail/&ogbl
    - link "इमेज खोजें":
      - /url: https://www.google.com/imghp?hl=hi&ogbl
      - text: Images
    - button "Google ऐप"
    - link "साइन इन करें":
      - /url: https://accounts.google.com/ServiceLogin?hl=hi&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
    `);
  // Click the element to trigger the next user action.
  await page.locator('#gws-output-pages-elements-homepage_additional_languages__als').click();
  // Click the element to trigger the next user action.
  await page.locator('svg').nth(4).click();
});
