// Import Playwright test helpers and any required libraries.
const{test,expect} = require('@playwright/test')

    // Define the test case and assign a descriptive name.
    test("Google page sample test case",async function ({page}){
        // Navigate the browser to the target test page URL.
        await page.goto("https://www.google.com/")
        //assigen wait for page load
        waitUntill:'load';
        //wait for 5 seconds
        timeout:'5000';
        // Verify the page title matches the expected value or pattern.
        await expect(page).toHaveTitle("Google");
        //click on AI mode
        // Click the element to trigger the next user action.
        await page.getByText('AI Mode', { exact: true }).click()
        //click on search box
        // Click the element to trigger the next user action.
        await page.getByRole('combobox', { name: 'Search' }).click();
        // Verify the page title matches the expected value or pattern.
        await expect(page).toHaveTitle("Google");
        //pause the browser
 

// Basic: by class (works in most modern browsers / drivers)
// Store a value, element handle, or generated data for later use.
const plusIconFirst = page.locator('//*[name()="svg" and @class="EQxvpc m4l7Cf"]').first();
// Click the element to trigger the next user action.
plusIconFirst.click();

})

