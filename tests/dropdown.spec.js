// Import Playwright test helpers and any required libraries.
import { test, expect } from '@playwright/test';

// Define the test case and assign a descriptive name.
test('test', async ({ page }) => {
  // Navigate the browser to the target test page URL.
  await page.goto('https://freelance-learn-automation.vercel.app/signup');
  await page.setDefaultTimeout(5000);
  // Assert the element or page contains the expected text.
  await expect(page.locator('form')).toContainText('Sign Up');
  //generate random data using faker library and fill the form
  // Import Playwright test helpers and any required libraries.
  const { faker } = require('@faker-js/faker');
  // Store a value, element handle, or generated data for later use.
  const randomName = faker.person.fullName();
  // Store a value, element handle, or generated data for later use.
  const randomEmail = faker.internet.email();
  // Store a value, element handle, or generated data for later use.
  const randomPassword = faker.internet.password({ length: 12 });
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Name' }).fill(randomName);
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
  // Fill the target input field with the specified value.
  await page.getByRole('textbox', { name: 'Password must be atleast 6' }).fill(randomPassword);
//select checkbox by using getByText method
  // Toggle the checkbox or option input.
  await page.getByText('SQL').locator('..').locator('input[type="checkbox"]').check();
    //select selenium checkbox using relative xpath
  // Toggle the checkbox or option input.
  await page.locator('//input[@id=\'69fcaff7416ceeaa32bf5766\']').check();
  //selecting checkbox using label text
  // Toggle the checkbox or option input.
  await page.getByLabel('PHP').check();
  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'State:' })).toBeVisible();
  // getting all the option texts of the dropdown and printing them
  // Store a value, element handle, or generated data for later use.
  const statedropdown = await page.locator('#state option').allTextContents();
  //get the count of dropdown options
  // Store a value, element handle, or generated data for later use.
  const dropdowncount = await page.locator('#state option').count();
  // Log information to the console for debugging or verification.
  console.log("Total options in state dropdown:", dropdowncount);
  //validate the dropdown options whether it contains the expected values
  // Assert a page condition with Playwright matchers.
  await expect(statedropdown.includes('Maharashtra')).toBeTruthy();
  // print values one by one
  for (let i = 0; i < statedropdown.length; i++) {
    // Log information to the console for debugging or verification.
    console.log(statedropdown[i]);
  }
  //select dropdown value by label
  //await page.locator('#state').selectOption({ label: 'Maharashtra' });
  //selct dropdown value by value
  //await page.locator('#state').selectOption({ value: 'MP' });
  //select dropdown value by index
  // Select a value from the dropdown menu.
  await page.locator('#state').selectOption({ index: 3 });  

  // Assert that the expected element is visible on the page.
  await expect(page.getByRole('heading', { name: 'Hobbies:' })).toBeVisible();
  //getting all the options of the dropdown and printing in console
  // 1) Get all option texts (not the select text)
// Store a value, element handle, or generated data for later use.
const hobbiesdropdown = await page.locator('#hobbies option').allTextContents();
//verify the dropdown options contains expected values
// Assert a page condition with Playwright matchers.
await expect(hobbiesdropdown.includes('Reading')).toBeTruthy();
// print values one by one
for (let i = 0; i < hobbiesdropdown.length; i++) {
  // Log information to the console for debugging or verification.
  console.log(hobbiesdropdown[i]);
}

// 2) Assert the array
// Assert a page condition with Playwright matchers.
await expect(hobbiesdropdown).toEqual(['Select Multiple Hobbies','Playing','Reading','Swimming','Singing','Dancing']);

// 3) Select one value
// Select a value from the dropdown menu.
await page.locator('#hobbies').selectOption({ label: 'Reading' });
// click on sign up button
// Click the element to trigger the next user action.
await page.getByRole('button', { name: 'Sign Up' }).click();
// 1. Locate the message directly using case-insensitive text matching
// Store a value, element handle, or generated data for later use.
const successMessage = page.getByText(/Signup successfully, Please login!/i);

// 2. Assert visibility (Playwright will auto-wait up to 5000ms for it to appear)
// Assert that the expected element is visible on the page.
await expect(successMessage).toBeVisible();
//wait for msg to disappear
// Wait briefly to allow UI updates or manual observation.
await page.waitForTimeout(2000);
// Close the current page or browser at the end of the test.
await page.close();
});

