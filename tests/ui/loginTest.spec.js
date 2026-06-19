/**
 * loginTest.spec.js - UI Tests for Login Page
 * Contains test cases for login functionality
 */

const test = require('../../src/fixtures/fixtures');
const testData = require('../../src/data/testData');
const { getBaseURL } = require('../../src/config/config');
const { expect } = require('@playwright/test');

test.describe('Login Page Tests', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    const baseURL = getBaseURL();
    await loginPage.navigateToLoginPage(baseURL);
  });

  test('TC_001 - User can login with valid credentials', async ({ loginPage, page }) => {
    // Arrange
    const user = testData.users.validUser;
    
    // Act
    await loginPage.login(user.email, user.password);
    
    // Assert
    expect(page.url()).toContain('/home');
  });

  test('TC_002 - User sees error with invalid credentials', async ({ loginPage }) => {
    // Arrange
    const user = testData.users.invalidUser;
    
    // Act
    await loginPage.fill(loginPage.usernameInput, user.email);
    await loginPage.fill(loginPage.passwordInput, user.password);
    await loginPage.click(loginPage.loginButton);
    
    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBe(true);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(testData.messages.loginFailed);
  });

  test('TC_003 - Login button is disabled with empty fields', async ({ loginPage }) => {
    // Assert
    const isEnabled = await loginPage.isLoginButtonEnabled();
    expect(isEnabled).toBe(false);
  });

  test('TC_004 - User can use remember me option', async ({ loginPage, page }) => {
    // Arrange
    const user = testData.users.validUser;
    
    // Act
    await loginPage.loginWithRememberMe(user.email, user.password);
    
    // Assert
    expect(page.url()).toContain('/home');
    // Note: You might want to check for persistent cookies here
  });

  test('TC_005 - Forgot password link navigates correctly', async ({ loginPage, page }) => {
    // Act
    await loginPage.clickForgotPasswordLink();
    
    // Assert
    expect(page.url()).toContain('/forgot-password');
  });

  test('TC_006 - Email field shows error with invalid email', async ({ loginPage }) => {
    // Act
    await loginPage.fill(loginPage.usernameInput, 'invalidemail');
    await loginPage.click(loginPage.passwordInput); // Trigger blur
    
    // Assert - Assuming there's a field validation message
    const emailField = loginPage.page.locator(loginPage.usernameInput);
    const validation = await emailField.getAttribute('aria-invalid');
    expect(validation).toBe('true');
  });

  test('TC_007 - Password field is masked', async ({ loginPage }) => {
    // Act
    await loginPage.fill(loginPage.passwordInput, 'testpassword');
    
    // Assert
    const inputType = await loginPage.getAttribute(loginPage.passwordInput, 'type');
    expect(inputType).toBe('password');
  });
});
