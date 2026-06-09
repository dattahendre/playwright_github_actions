import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nodejs.org/en/download/current');
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Download Node.js®');
  await page.getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Everything' })).toBeVisible();
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.locator('#column2').getByRole('link', { name: 'Assertion testing' }).click();
  await page.getByRole('link', { name: 'Buffer' }).click();
  await page.getByRole('link', { name: 'Node.js' }).click();
  await expect(page.getByRole('heading', { name: 'Run JavaScript Everywhere' })).toBeVisible();
  await page.getByRole('link', { name: 'Learn', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Introduction to Node.js' })).toBeVisible();
  await page.getByRole('link', { name: 'How much JavaScript do you' }).click();
  await page.getByRole('link', { name: 'Data Types' }).click();
  await expect(page.getByRole('heading', { name: 'JavaScript data types and' })).toBeVisible();
});