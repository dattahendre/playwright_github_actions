// Import Playwright test helpers and any required libraries.
import { test } from '@playwright/test';
// Import Playwright test helpers and any required libraries.
import { faker } from '@faker-js/faker';

// Define the test case and assign a descriptive name.
test('Register with Faker data', async ({ page }) => {
  // Generates random text containing letters and numbers
  // Store a value, element handle, or generated data for later use.
  const randomAlphaNumeric = faker.string.alphanumeric(10); 
  // Store a value, element handle, or generated data for later use.
  const randomPassword = faker.internet.password({ length: 12 });
  // Store a value, element handle, or generated data for later use.
  const randomEmail = faker.internet.email();
  // Store a value, element handle, or generated data for later use.
  const javascriptmethod = Math.random().toString(36).substring(2, 10); // Generates a random first name

  // Log information to the console for debugging or verification.
  console.log('Random Alphanumeric:', randomAlphaNumeric);
  // Log information to the console for debugging or verification.
  console.log('Random Password:', randomPassword);
  // Log information to the console for debugging or verification.
  console.log('Random Email:', randomEmail);
  // Log information to the console for debugging or verification.
  console.log('Using built-in method:', javascriptmethod);
});
