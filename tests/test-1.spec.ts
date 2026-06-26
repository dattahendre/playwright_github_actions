import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
  await expect(page.getByRole('link', { name: 'Playground' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Forms' })).toBeVisible();
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await expect(page.getByText('Option 1')).toBeVisible();
  await page.locator('.inner-circle').first().click();
});