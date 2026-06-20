import { test, expect } from '@playwright/test';

test.describe('Exam Registration Form Validation', () => {
  
  test('should successfully fill and submit the exam registration form', async ({ page }) => {
    // 1. Navigate to the target application page
    // Replace with your actual application URL or routing setup
    await page.goto('https://www.jotform.com/form-templates/exam-registration-form');

    // 2. Structural & Visibility Assertions (Validate form state before interaction)
    const formHeader = page.getByRole('heading', { name: 'Exam Registration Form', exact: true });
    await expect(formHeader).toBeVisible();

    // 3. Define Locators using strict, user-facing attributes
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    
    // Using exact match for the label while handling the nested asterisk (*) span
    const registrationNumberInput = page.getByRole('spinbutton', { name: 'Student Registration Number' });
    const registeredCourseInput = page.getByRole('textbox', { name: 'Registered Course' });
    
    // Date fields targeting the visible 'lite_mode' inputs
    const examStartDateInput = page.locator('#lite_mode_11');
    const examEndDateInput = page.locator('#lite_mode_12');

    // 4. Fill Out Form Fields
    await firstNameInput.fill('John');
    await lastNameInput.fill('Doe');
    await registrationNumberInput.fill('20261024');
    await registeredCourseInput.fill('Advanced Software Architecture');
    
    // Interactions with formatted date inputs
    await examStartDateInput.click();
    await examStartDateInput.fill('07-15-2026');
    
    await examEndDateInput.click();
    await examEndDateInput.fill('07-25-2026');

    // 5. Value Assertions (Verify UI state prior to submission)
    await expect(firstNameInput).toHaveValue('John');
    await expect(lastNameInput).toHaveValue('Doe');
    await expect(registrationNumberInput).toHaveValue('20261024');
    await expect(registeredCourseInput).toHaveValue('Advanced Software Architecture');
    await expect(examStartDateInput).toHaveValue('07-15-2026');
    await expect(examEndDateInput).toHaveValue('07-25-2026');

    // 6. Form Submission
    // Note: The provided HTML snippet was cut off right before the submit button element.
    // Assuming a standard form submit button structure or submitting via the form element directly:
    const registrationForm = page.locator('#20866583426562');
    
    // We listen for the post-submit network navigation or API call if applicable
    await Promise.all([
      page.waitForURL('**/thank-you/classic*'), // Matches the form action attribute
      registrationForm.evaluate((form: HTMLFormElement) => form.submit()) 
      // Alternative standard locator if button exists: await page.getByRole('button', { name: 'Submit' }).click();
    ]);

    // 7. Post-Submission Validation
    // Validate that the system safely moved away from the registration form
    await expect(formHeader).not.toBeVisible();
  });
});
