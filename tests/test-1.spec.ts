import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Register with Faker data', async ({ page }) => {
  // Generates random text containing letters and numbers
  const randomAlphaNumeric = faker.string.alphanumeric(10); 
  const randomPassword = faker.internet.password({ length: 12 });
  const randomEmail = faker.internet.email();
  const javascriptmethod = Math.random().toString(36).substring(2, 7); // Generates a random first name

  console.log('Random Alphanumeric:', randomAlphaNumeric);
  console.log('Random Password:', randomPassword);
  console.log('Random Email:', randomEmail);
  console.log('Using built-in method:', javascriptmethod);
});