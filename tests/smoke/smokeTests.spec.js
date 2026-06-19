/**
 * smokeTests.spec.js - Smoke Tests
 * Quick sanity tests to verify basic functionality
 */

const test = require('../../src/fixtures/fixtures');
const testData = require('../../src/data/testData');
const { getBaseURL } = require('../../src/config/config');
const { expect } = require('@playwright/test');

test.describe('Smoke Tests', () => {

  test('SMOKE_001 - Application loads successfully', async ({ page }) => {
    // Act
    const baseURL = getBaseURL();
    await page.goto(baseURL);
    
    // Assert
    expect(page.url()).toContain(baseURL);
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('SMOKE_002 - Login page is accessible', async ({ loginPage }) => {
    // Arrange
    const baseURL = getBaseURL();
    
    // Act
    await loginPage.navigateToLoginPage(baseURL);
    
    // Assert
    expect(loginPage.page.url()).toContain('/login');
    const isFormVisible = await loginPage.isElementVisible(loginPage.usernameInput);
    expect(isFormVisible).toBe(true);
  });

  test('SMOKE_003 - User can login and logout', async ({ 
    loginPage, 
    homePage, 
    page 
  }) => {
    // Arrange
    const baseURL = getBaseURL();
    const user = testData.users.validUser;
    
    // Act - Login
    await loginPage.navigateToLoginPage(baseURL);
    await loginPage.login(user.email, user.password);
    
    // Assert - Logged in
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);
    
    // Act - Logout
    await homePage.logout();
    
    // Assert - Logged out
    expect(page.url()).toContain('/login');
  });

  test('SMOKE_004 - Navigation menu items are clickable', async ({ 
    authenticatedPage, 
    page 
  }) => {
    const baseURL = getBaseURL();
    
    // Navigate to home
    await page.goto(baseURL + '/home');
    
    // Act
    const menuItems = ['Products', 'Orders', 'Wishlist'];
    
    for (const item of menuItems) {
      // Assert
      const menuButton = page.locator(`button:has-text("${item}")`);
      expect(await menuButton.isVisible()).toBe(true);
    }
  });

  test('SMOKE_005 - API endpoint is accessible', async ({ apiContext }) => {
    // Act
    const response = await apiContext.get('/health');
    
    // Assert
    expect(response.status()).toBe(200);
  });

  test('SMOKE_006 - Database connectivity', async ({ apiContext }) => {
    // Act
    const response = await apiContext.get('/status');
    const responseBody = await response.json();
    
    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.database).toBe('connected');
  });

  test('SMOKE_007 - Homepage loads without errors', async ({ page }) => {
    const baseURL = getBaseURL();
    
    // Act
    await page.goto(baseURL);
    
    // Assert
    const errors = await page.evaluate(() => {
      return window.errors || [];
    });
    expect(errors.length).toBe(0);
  });
});
