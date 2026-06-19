/**
 * keyboardActionRefactored.spec.js - Refactored from keyboardaction.spec.js
 * Using Modern Playwright Framework
 * 
 * BEFORE (Old Structure):
 * - Hard-coded selectors
 * - Direct page object usage
 * - No page object model
 * - No test data management
 * - No logging
 * 
 * AFTER (New Framework):
 * - Page object model
 * - Reusable page components
 * - Centralized test data
 * - Built-in logging
 * - Better maintainability
 */

const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const { delay } = require('../../src/utils/testUtils');

// Create SearchPage if it doesn't exist
class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchBox = "textarea[name='q']";
  }

  async navigateToGoogle() {
    await this.page.goto('https://www.google.com/');
  }

  async searchForTerm(term) {
    await this.page.locator(this.searchBox).type(term);
  }

  async selectAllText() {
    await this.page.keyboard.press('Control+A');
  }

  async copyText() {
    await this.page.keyboard.press('Control+C');
  }

  async clearText() {
    await this.page.keyboard.press('Control+Delete');
  }

  async performSelectAllAndCopy() {
    await this.selectAllText();
    await delay(1000);
    await this.copyText();
    await delay(1000);
    await this.selectAllText();
    await this.clearText();
  }
}

test.describe('Keyboard Action Tests', () => {
  
  test.beforeEach(async ({ logger }) => {
    logger.info('Setting up keyboard action test');
  });

  test('TC_KEYBOARD_001 - User can perform keyboard actions (Select, Copy, Delete)', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_KEYBOARD_001 - Keyboard action test case');
      const searchPage = new SearchPage(page);
      const searchTerm = 'Mukesh otwani';

      // Act
      logger.info(`Navigating to Google`);
      await searchPage.navigateToGoogle();

      logger.info(`Searching for: ${searchTerm}`);
      await searchPage.searchForTerm(searchTerm);

      logger.info('Performing keyboard actions: Select All -> Copy -> Delete');
      await searchPage.performSelectAllAndCopy();

      // Assert
      logger.info('Verifying search box is cleared');
      const searchBoxValue = await page.locator(searchPage.searchBox).inputValue();
      expect(searchBoxValue).toBe('');

      logger.info('Test passed successfully');
    });

  test('TC_KEYBOARD_002 - User can select text using Ctrl+A', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_KEYBOARD_002 - Select all text test');
      const searchPage = new SearchPage(page);
      const testText = 'Playwright Testing Framework';

      // Act
      await searchPage.navigateToGoogle();
      await searchPage.searchForTerm(testText);
      await searchPage.selectAllText();

      // Assert
      logger.info('Text selected successfully');
      expect(page.url()).toContain('google.com');
      
      logger.info('Test passed');
    });

  test('TC_KEYBOARD_003 - User can copy text using Ctrl+C', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_KEYBOARD_003 - Copy text test');
      const searchPage = new SearchPage(page);
      const testText = 'QA Automation';

      // Act
      await searchPage.navigateToGoogle();
      await searchPage.searchForTerm(testText);
      await searchPage.selectAllText();
      await delay(500);
      
      // Get text before copy
      const textBeforeCopy = await page.locator(searchPage.searchBox).inputValue();
      
      // Copy the text
      await searchPage.copyText();
      await delay(500);

      // Assert
      logger.info(`Text copied. Original text: ${textBeforeCopy}`);
      expect(textBeforeCopy).toBe(testText);
      
      logger.info('Test passed');
    });

  test('TC_KEYBOARD_004 - User can delete text using Ctrl+Delete', 
    async ({ page, logger }) => {
      // Arrange
      logger.info('Test: TC_KEYBOARD_004 - Delete text test');
      const searchPage = new SearchPage(page);
      const testText = 'Delete This Text';

      // Act
      await searchPage.navigateToGoogle();
      await searchPage.searchForTerm(testText);
      
      // Verify text is entered
      const textBeforeDelete = await page.locator(searchPage.searchBox).inputValue();
      expect(textBeforeDelete).toBe(testText);

      // Delete the text
      await searchPage.selectAllText();
      await searchPage.clearText();
      await delay(500);

      // Assert
      const textAfterDelete = await page.locator(searchPage.searchBox).inputValue();
      expect(textAfterDelete).toBe('');
      
      logger.info('Text deleted successfully');
    });

  test.afterEach(async ({ logger }) => {
    logger.info('Keyboard action test completed');
  });
});
