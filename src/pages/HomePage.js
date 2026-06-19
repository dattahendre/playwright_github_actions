/**
 * HomePage.js - Page Object for Home Page
 * Manages all interactions with the home page
 */

const BasePage = require('./BasePage');

class HomePage extends BasePage {
  // Selectors
  userProfileIcon = '.user-profile-icon';
  logoutButton = 'button[data-testid="logout"]';
  welcomeMessage = '.welcome-message';
  navigationMenu = '.main-nav';
  searchBox = '#search-input';
  searchButton = 'button[type="submit"][aria-label="Search"]';

  /**
   * Navigate to home page
   * @param {string} baseURL - Base URL of the application
   */
  async navigateToHomePage(baseURL) {
    await this.goto(`${baseURL}/home`);
  }

  /**
   * Get welcome message
   * @returns {Promise<string>} Welcome message text
   */
  async getWelcomeMessage() {
    return await this.getText(this.welcomeMessage);
  }

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>} True if user profile icon is visible
   */
  async isUserLoggedIn() {
    return await this.isElementVisible(this.userProfileIcon);
  }

  /**
   * Logout user
   */
  async logout() {
    await this.click(this.userProfileIcon);
    await this.click(this.logoutButton);
    await this.page.waitForNavigation();
  }

  /**
   * Search for a term
   * @param {string} searchTerm - Term to search
   */
  async search(searchTerm) {
    await this.fill(this.searchBox, searchTerm);
    await this.click(this.searchButton);
    await this.page.waitForNavigation();
  }

  /**
   * Navigate to menu item
   * @param {string} menuItem - Menu item text
   */
  async navigateToMenuItem(menuItem) {
    await this.page.click(`${this.navigationMenu} >> text=${menuItem}`);
  }
}

module.exports = HomePage;
