/**
 * fixtures.js - Playwright Custom Fixtures
 * Provides reusable fixtures for tests
 */

const { test: base } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

/**
 * Custom fixtures for the application
 */
const test = base.extend({
  /**
   * Fixture: loginPage
   * Provides LoginPage instance
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Fixture: homePage
   * Provides HomePage instance
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Fixture: authenticatedPage
   * Automatically logs in user before test
   */
  authenticatedPage: async ({ page, loginPage }, use) => {
    const baseURL = process.env.BASE_URL || 'http://localhost:3000';
    await loginPage.navigateToLoginPage(baseURL);
    await loginPage.login('testuser@example.com', 'password123');
    await use(page);
    // Cleanup: logout after test
    const homePage = new HomePage(page);
    if (await homePage.isUserLoggedIn()) {
      await homePage.logout();
    }
  },

  /**
   * Fixture: apiContext
   * Provides API testing context with authentication headers
   */
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${process.env.API_TOKEN || 'test-token'}`,
        'Content-Type': 'application/json'
      }
    });
    await use(context);
    await context.dispose();
  },

  /**
   * Fixture: testData
   * Provides test data objects
   */
  testData: async ({}, use) => {
    const data = {
      validUser: {
        email: 'testuser@example.com',
        password: 'password123',
        name: 'Test User'
      },
      invalidUser: {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      },
      newUser: {
        email: `user_${Date.now()}@example.com`,
        password: 'SecurePass123!',
        name: 'New Test User'
      }
    };
    await use(data);
  },

  /**
   * Fixture: logger
   * Provides simple logging functionality
   */
  logger: async ({}, use) => {
    const logger = {
      info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
      error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
      warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
      debug: (message) => console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`)
    };
    await use(logger);
  }
});

module.exports = test;
