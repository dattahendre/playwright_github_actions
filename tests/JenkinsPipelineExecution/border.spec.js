// Import Playwright test helpers and any required libraries.
const { test, expect } = require('@playwright/test');

// Define the test case and assign a descriptive name.
test('Border test case', async ({ page }) => {
    // Navigate the browser to the target test page URL.
    await page.goto('https://playground.bondaracademy.com/');
    // Store a value, element handle, or generated data for later use.
    const title = await page.title();
    // Log information to the console for debugging or verification.
    console.log("The page title is: " + title);
    //click on forms link
    // Click the element to trigger the next user action.
    await page.getByRole('link', { name: 'Forms' }).click();
    //click on form layout link
    // Click the element to trigger the next user action.
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    //click on datepikcker link
    // Click the element to trigger the next user action.
    await page.getByRole('link', { name: 'Datepicker' }).click();
    
    //click on first calender
    // Click the element to trigger the next user action.
    await page.getByPlaceholder('Form Picker').click();
    //select date from calender
    //await page.getByRole('option', { name: '15' }).click();
    
    // Click the element to trigger the next user action.
    await page.locator('(//div[@class="cell-content"][normalize-space()="15"])[1]').click();
    //date picker with range
    // Click the element to trigger the next user action.
    await page.getByPlaceholder('Range Picker').click();

    // Click the element to trigger the next user action.
    await page.locator('(//div[@class="cell-content"][normalize-space()="25"])[1]').click();
    //min max date picker
    // Click the element to trigger the next user action.
    await page.getByPlaceholder('Min Max Picker').click();
    // Click the element to trigger the next user action.
    await page.locator('(//div[@class="cell-content"][normalize-space()="6"])[1]').click();
    // click on user profile icon
    //await page.getByRole('button', { name: 'Nick Jones' }).click();
    // Click the element to trigger the next user action.
    await page.locator('(//div[@class="user-container"])').click();
    //click on logout button
    //await page.getByRole('link', { name: 'Log out' }).click();
    // Click the element to trigger the next user action.
    await page.getByTitle('Log out').click();
    // close the browser after test case execution
await page.close();
    
});

