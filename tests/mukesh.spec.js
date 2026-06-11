// Import Playwright test helpers and any required libraries.
const { test, expect } = require('@playwright/test')

// Define the test case and assign a descriptive name.
test.skip("my first playwright test", async function ({ page }) {

    expect(22).toBe(22);
    
})

// Define the test case and assign a descriptive name.
test.skip("my second playwright test", async function ({ page }) {
    expect("datta").toContain("datta");

})

// Define the test case and assign a descriptive name.
test("my 3rd test", async function({page}){

// Navigate the browser to the target test page URL.
await page.goto("https://www.google.com/")
// Store a value, element handle, or generated data for later use.
const title = await page.title();
// Store a value, element handle, or generated data for later use.
const url = await page.url();
// Log information to the console for debugging or verification.
console.log("The google page  is:"+title);
// Log information to the console for debugging or verification.
console.log("The google page URL is:"+url);
// Verify the page title matches the expected value or pattern.
await expect(page).toHaveTitle(title);

})
