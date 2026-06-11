//require('@playwright/test') we given path in package.json file so we can directly import test and expect from '@playwright/test'
//const{test,expect} is for test case creation and assertion
// Import Playwright test helpers and any required libraries.
const{test,expect}=require('@playwright/test')
//write test case with test function and give name to test case and pass async function with page as parameter
// Define the test case and assign a descriptive name.
test("Tricentis sample test case",async function ({page}){
    //navigate to tricentis page
    // Navigate the browser to the target test page URL.
    await page.goto('https://www.tricentis.com/');

    //check get started button is visible on the page
    // Assert that the expected element is visible on the page.
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    
    //store element text into variable using textContent()
    // Store a value, element handle, or generated data for later use.
    const value = await page.getByRole('link', { name: 'Get started' }).textContent();
    // Log information to the console for debugging or verification.
    console.log("Value of link text is:", value);
    //click on close button of pop up
    // Click the element to trigger the next user action.
    await page.getByRole('button', { name: 'Close' }).click();
    //click on get started button
    // Click the element to trigger the next user action.
    await page.getByRole('link', { name: 'Get started' }).click();
    //verify heading text
    // Navigate the browser to the target test page URL.
    await page.goto('https://www.tricentis.com/software-testing-tool-trial-demo');
    // Click the element to trigger the next user action.
    await page.getByRole('heading', { name: 'Intelligent test automation' }).click();
    // Click the element to trigger the next user action.
    await page.getByText('Cloud-based and flexibly').click();
    // Click the element to trigger the next user action.
    await page.getByRole('link', { name: 'Free trial' }).first().click();
    // Click the element to trigger the next user action.
    await page.getByRole('heading', { name: 'Tricentis Tosca trial' }).click();
    //verify heading text
    // Assert that the expected element is visible on the page.
    await expect(page.getByRole('heading', { name: 'Request your trial of Tosca today' })).toBeVisible();
    //select checkbox
    // Toggle the checkbox or option input.
    await page.locator('#emailOptin').check();
    //verify link text
    // Assert that the expected element is visible on the page.
    await expect(page.getByRole('link', { name: 'AI Solutions Product-Specific Terms' })).toBeVisible();
   // await expect(page.getByRole('heading', { name: 'Cloud-based and flexibly deployed test automation for optimized end-to-end testing of all your applications.' })).toBeVisible();
   // close browser after test case execution
   // Close the current page or browser at the end of the test.
   await page.close();
    
});

