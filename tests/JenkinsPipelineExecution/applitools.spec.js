import { test, expect } from '@playwright/test';

test.describe('Login Form Functional Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Replace with your actual local server URL or path to the HTML file
    await page.goto('https://demo.applitools.com/'); 
  });



  test('should navigate to app page on Sign In click', async ({ page }) => {
    // Target the sign-in button anchor link by ID
    const signInButton = page.locator('#log-in');
    
    // Click the button and wait for the target page navigation
    await signInButton.click();
    
    // Assert that the URL changes to the expected path
    await expect(page).toHaveURL(/.*\/app.html/);
  });

  test('should find social media links', async ({ page }) => {
    // Verify that the social icons exist based on their images
    const twitterIcon = page.locator('img[src="img/social-icons/twitter.png"]');
    const facebookIcon = page.locator('img[src="img/social-icons/facebook.png"]');
    const linkedinIcon = page.locator('img[src="img/social-icons/linkedin.png"]');

    await expect(twitterIcon).toBeVisible();
    await expect(facebookIcon).toBeVisible();
    await expect(linkedinIcon).toBeVisible();
  });
});
