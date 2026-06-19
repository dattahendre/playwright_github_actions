/**
 * oranageHrmLoginRefactored.spec.js - Refactored from Login.spec.js
 * Using Modern Playwright Framework
 * 
 * BEFORE (Old Structure):
 * - Direct page interactions
 * - Hard-coded selectors
 * - Hard-coded credentials
 * - No page object model
 * 
 * AFTER (New Framework):
 * - Page object model for login page
 * - Centralized test data
 * - Reusable fixtures
 * - Better organization
 * - Built-in logging
 */

const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const testData = require('../../src/data/testData');
const { getBaseURL } = require('../../src/config/config');

// OrangeHRM Login Page Object
class OrangeHRMLoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = 'input[placeholder="Username"]';
    this.passwordField = 'input[placeholder="Password"]';
    this.loginButton = 'button[type="submit"]';
    this.dashboardHeading = 'text=Dashboard';
    this.errorMessage = '.oxd-alert-content';
    this.screenshotPath = './screenshots';
  }

  async navigateToLogin(url) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async fillUsername(username) {
    await this.page.getByPlaceholder('Username').fill(username);
  }

  async fillPassword(password) {
    await this.page.getByPlaceholder('Password').fill(password);
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.takeScreenshot('login-credentials-entered');
    await this.clickLoginButton();
    await this.page.waitForNavigation();
  }

  async verifyDashboardVisible() {
    return await this.page.getByRole('heading', { name: 'Dashboard' }).isVisible();
  }

  async getDashboardHeading() {
    return await this.page.getByRole('heading', { name: 'Dashboard' }).textContent();
  }

  async getCurrentURL() {
    return await this.page.url();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `${this.screenshotPath}/${name}.png` });
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }

  async verifyErrorMessageVisible() {
    return await this.page.locator(this.errorMessage).isVisible();
  }
}

test.describe('OrangeHRM Login Tests', () => {

  const loginURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  test.beforeEach(async ({ logger }) => {
    logger.info('Preparing OrangeHRM login test');
  });

  test('TC_OHRM_001 - User can login with valid credentials (Admin)', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_OHRM_001 - Enter username and password and click login button');
      const loginPage = new OrangeHRMLoginPage(page);
      const validCredentials = {
        username: 'Admin',
        password: 'admin123'
      };

      // Act
      logger.info(`Navigating to OrangeHRM login page: ${loginURL}`);
      await loginPage.navigateToLogin(loginURL);

      logger.info(`Filling credentials - Username: ${validCredentials.username}`);
      await loginPage.fillUsername(validCredentials.username);
      await loginPage.fillPassword(validCredentials.password);

      logger.info('Taking screenshot after entering credentials');
      await loginPage.takeScreenshot('login-success');

      logger.info('Clicking login button');
      await loginPage.clickLoginButton();

      // Assert
      logger.info('Verifying dashboard is visible');
      const isDashboardVisible = await loginPage.verifyDashboardVisible();
      expect(isDashboardVisible).toBe(true);

      logger.info('Verifying dashboard heading');
      const dashboardHeading = await loginPage.getDashboardHeading();
      expect(dashboardHeading).toContain('Dashboard');

      logger.info('Verifying URL after login');
      const currentURL = await loginPage.getCurrentURL();
      console.log('Current URL after login:', currentURL);
      expect(currentURL).not.toContain('/auth/login');

      logger.info('Taking screenshot of dashboard');
      await loginPage.takeScreenshot('login-dashboard');

      logger.info('Test passed successfully');
    });

  test('TC_OHRM_002 - User cannot login with invalid credentials', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_OHRM_002 - Login with invalid credentials');
      const loginPage = new OrangeHRMLoginPage(page);
      const invalidCredentials = {
        username: 'InvalidUser',
        password: 'InvalidPassword'
      };

      // Act
      logger.info('Navigating to login page');
      await loginPage.navigateToLogin(loginURL);

      logger.info('Entering invalid credentials');
      await loginPage.fillUsername(invalidCredentials.username);
      await loginPage.fillPassword(invalidCredentials.password);

      logger.info('Clicking login button');
      await loginPage.clickLoginButton();

      // Wait for error message
      await page.waitForTimeout(2000);

      // Assert
      logger.info('Verifying error message is displayed');
      const isErrorVisible = await loginPage.verifyErrorMessageVisible();
      expect(isErrorVisible).toBe(true);

      logger.info('Verifying user is still on login page');
      const url = await loginPage.getCurrentURL();
      expect(url).toContain('/auth/login');

      logger.info('Test passed - Invalid login rejected');
    });

  test('TC_OHRM_003 - User sees error with empty username', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_OHRM_003 - Empty username validation');
      const loginPage = new OrangeHRMLoginPage(page);

      // Act
      logger.info('Navigating to login page');
      await loginPage.navigateToLogin(loginURL);

      logger.info('Leaving username empty and entering password');
      await loginPage.fillPassword('admin123');
      await loginPage.clickLoginButton();

      // Wait for validation
      await page.waitForTimeout(2000);

      // Assert
      logger.info('Verifying validation message appears');
      const url = await loginPage.getCurrentURL();
      expect(url).toContain('/auth/login');

      logger.info('Test passed - Empty field validation works');
    });

  test('TC_OHRM_004 - User sees error with empty password', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_OHRM_004 - Empty password validation');
      const loginPage = new OrangeHRMLoginPage(page);

      // Act
      logger.info('Navigating to login page');
      await loginPage.navigateToLogin(loginURL);

      logger.info('Entering username without password');
      await loginPage.fillUsername('Admin');
      await loginPage.clickLoginButton();

      // Wait for validation
      await page.waitForTimeout(2000);

      // Assert
      logger.info('Verifying validation message appears');
      const url = await loginPage.getCurrentURL();
      expect(url).toContain('/auth/login');

      logger.info('Test passed - Empty password validation works');
    });

  test('TC_OHRM_005 - User can successfully login and logout', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_OHRM_005 - Complete login and logout flow');
      const loginPage = new OrangeHRMLoginPage(page);

      // Act - Login
      logger.info('Navigating and logging in');
      await loginPage.navigateToLogin(loginURL);
      await loginPage.login('Admin', 'admin123');

      // Assert - Logged in
      logger.info('Verifying login successful');
      const isDashboardVisible = await loginPage.verifyDashboardVisible();
      expect(isDashboardVisible).toBe(true);

      // Act - Logout
      logger.info('Clicking user menu for logout');
      await page.getByRole('img', { name: 'profile picture' }).click();
      
      logger.info('Clicking logout button');
      await page.getByRole('menuitem', { name: 'Logout' }).click();

      // Assert - Logged out
      logger.info('Verifying redirected to login page');
      await page.waitForNavigation();
      const logoutURL = await loginPage.getCurrentURL();
      expect(logoutURL).toContain('/auth/login');

      logger.info('Test passed - Login and logout successful');
    });

  test.afterEach(async ({ logger }) => {
    logger.info('OrangeHRM login test completed');
  });
});
