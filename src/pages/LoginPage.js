/**
 * LoginPage.js - Page Object for Login Page
 * Manages all interactions with the login page
 */

const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  // Selectors
  usernameInput = '#username';
  passwordInput = '#password';
  loginButton = 'button[type="submit"]';
  errorMessage = '.error-message';
  rememberMeCheckbox = '#rememberMe';
  forgotPasswordLink = 'a[href="/forgot-password"]';

  /**
   * Navigate to login page
   * @param {string} baseURL - Base URL of the application
   */
  async navigateToLoginPage(baseURL) {
    await this.goto(`${baseURL}/login`);
  }

  /**
   * Login with username and password
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForNavigation();
  }

  /**
   * Login with remember me option
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async loginWithRememberMe(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.rememberMeCheckbox);
    await this.click(this.loginButton);
    await this.page.waitForNavigation();
  }

  /**
   * Get error message
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageDisplayed() {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPasswordLink() {
    await this.click(this.forgotPasswordLink);
    await this.page.waitForNavigation();
  }

  /**
   * Check if login button is enabled
   * @returns {Promise<boolean>} True if button is enabled
   */
  async isLoginButtonEnabled() {
    const isDisabled = await this.getAttribute(this.loginButton, 'disabled');
    return isDisabled === null;
  }
}

module.exports = LoginPage;
