import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page.getByRole('link', { name: 'Gmail' })).toBeVisible();
  await expect(page.getByLabel('इमेज खोजें')).toContainText('Images');

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
  await page.locator('#gws-output-pages-elements-homepage_additional_languages__als').click();
  await page.locator('svg').nth(4).click();
});