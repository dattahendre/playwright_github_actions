/**
 * BasePage.js - Base class for all page objects
 * Contains common methods used across all page objects
 */

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector of the element
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill text in an input field
   * @param {string} selector - CSS selector of the element
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content from an element
   * @param {string} selector - CSS selector of the element
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - CSS selector of the element
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if an element is visible
   * @param {string} selector - CSS selector of the element
   * @returns {Promise<boolean>} True if visible, false otherwise
   */
  async isElementVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get attribute value from an element
   * @param {string} selector - CSS selector of the element
   * @param {string} attributeName - Name of the attribute
   * @returns {Promise<string>} Attribute value
   */
  async getAttribute(selector, attributeName) {
    return await this.page.getAttribute(selector, attributeName);
  }

  /**
   * Take a screenshot
   * @param {string} name - Name of the screenshot file
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }

  /**
   * Get current page URL
   * @returns {Promise<string>} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Go back to previous page
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Refresh the page
   */
  async refresh() {
    await this.page.reload();
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  /**
   * Press a key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    await this.page.press('body', key);
  }

  /**
   * Hover over an element
   * @param {string} selector - CSS selector of the element
   */
  async hover(selector) {
    await this.page.hover(selector);
  }

  /**
   * Double click on an element
   * @param {string} selector - CSS selector of the element
   */
  async doubleClick(selector) {
    await this.page.dblclick(selector);
  }

  /**
   * Right click on an element
   * @param {string} selector - CSS selector of the element
   */
  async rightClick(selector) {
    await this.page.click(selector, { button: 'right' });
  }

  /**
   * Select an option from a dropdown
   * @param {string} selector - CSS selector of the select element
   * @param {string} value - Value to select
   */
  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Type text slowly
   * @param {string} selector - CSS selector of the element
   * @param {string} text - Text to type
   * @param {number} delay - Delay between key presses in milliseconds
   */
  async typeText(selector, text, delay = 100) {
    await this.page.fill(selector, '');
    await this.page.type(selector, text, { delay });
  }

  /**
   * Execute JavaScript on the page
   * @param {string} script - JavaScript code to execute
   * @returns {Promise<any>} Result of the script
   */
  async executeScript(script) {
    return await this.page.evaluate(script);
  }
}

module.exports = BasePage;
