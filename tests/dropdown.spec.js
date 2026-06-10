import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://freelance-learn-automation.vercel.app/signup');
  await page.setDefaultTimeout(5000);
  await expect(page.locator('form')).toContainText('Sign Up');
  //generate random data using faker library and fill the form
  const { faker } = require('@faker-js/faker');
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password({ length: 12 });
  await page.getByRole('textbox', { name: 'Name' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
  await page.getByRole('textbox', { name: 'Password must be atleast 6' }).fill(randomPassword);
//select checkbox by using getByText method
  await page.getByText('SQL').locator('..').locator('input[type="checkbox"]').check();
    //select selenium checkbox using relative xpath
  await page.locator('//input[@id=\'69fcaff7416ceeaa32bf5766\']').check();
  //selecting checkbox using label text
  await page.getByLabel('PHP').check();
  await expect(page.getByRole('heading', { name: 'State:' })).toBeVisible();
  // getting all the option texts of the dropdown and printing them
  const statedropdown = await page.locator('#state option').allTextContents();
  console.log(statedropdown);
  // print values one by one
  for (let i = 0; i < statedropdown.length; i++) {
    console.log(statedropdown[i]);
  }
  await page.locator('#state').selectOption({ label: 'Maharashtra' });
  await expect(page.getByRole('heading', { name: 'Hobbies:' })).toBeVisible();
  //getting all the options of the dropdown and printing in console
  // 1) Get all option texts (not the select text)
const hobbiesdropdown = await page.locator('#hobbies option').allTextContents();

// 2) Assert the array
await expect(hobbiesdropdown).toEqual(['Select Multiple Hobbies','Playing','Reading','Swimming','Singing','Dancing']);

// 3) Select one value
await page.locator('#hobbies').selectOption({ label: 'Reading' });
// click on sign up button
await page.getByRole('button', { name: 'Sign Up' }).click();
// 1. Locate the message directly using case-insensitive text matching
const successMessage = page.getByText(/Signup successfully, Please login!/i);

// 2. Assert visibility (Playwright will auto-wait up to 5000ms for it to appear)
await expect(successMessage).toBeVisible();
await page.close();
});