/**
 * completeUserJourney.spec.js - E2E Tests
 * Tests complete user workflows from login to checkout
 */

const test = require('../../src/fixtures/fixtures');
const testData = require('../../src/data/testData');
const { getBaseURL } = require('../../src/config/config');
const { expect } = require('@playwright/test');

test.describe('Complete User Journey - E2E Tests', () => {

  test('TC_E2E_001 - User completes full shopping flow', async ({ 
    loginPage, 
    homePage, 
    page 
  }) => {
    const baseURL = getBaseURL();
    const user = testData.users.validUser;
    const product = testData.products.electronics;
    
    // Step 1: Navigate to login page
    await loginPage.navigateToLoginPage(baseURL);
    expect(page.url()).toContain('/login');
    
    // Step 2: Login
    await loginPage.login(user.email, user.password);
    await page.waitForNavigation();
    expect(page.url()).toContain('/home');
    
    // Step 3: Verify user is logged in
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);
    
    // Step 4: Get welcome message
    const welcomeMsg = await homePage.getWelcomeMessage();
    expect(welcomeMsg).toContain(user.name);
    
    // Step 5: Search for product
    await homePage.search(product.name);
    expect(page.url()).toContain('/search');
    
    // Step 6: Navigate to cart
    await page.click('a[href="/cart"]');
    expect(page.url()).toContain('/cart');
    
    // Step 7: Proceed to checkout
    await page.click('button:has-text("Checkout")');
    expect(page.url()).toContain('/checkout');
    
    // Step 8: Complete payment
    await page.fill('input[name="cardNumber"]', '4242424242424242');
    await page.fill('input[name="expiryDate"]', '12/25');
    await page.fill('input[name="cvv"]', '123');
    await page.click('button:has-text("Place Order")');
    
    // Step 9: Verify order confirmation
    const orderConfirmation = await page.textContent('.order-confirmation');
    expect(orderConfirmation).toContain(testData.messages.orderPlaced);
  });

  test('TC_E2E_002 - User can add and remove items from cart', async ({ 
    homePage, 
    page,
    loginPage,
    authenticatedPage 
  }) => {
    const baseURL = getBaseURL();
    const product = testData.products.clothing;
    
    // User is already authenticated due to fixture
    await homePage.navigateToHomePage(baseURL);
    
    // Navigate to products
    await page.click('a[href="/products"]');
    
    // Add product to cart
    await page.click(`button[data-product-id="${product.id}"]`);
    const addMessage = await page.textContent('.toast-notification');
    expect(addMessage).toContain(testData.messages.productAdded);
    
    // Navigate to cart
    await page.click('a[href="/cart"]');
    expect(page.locator(`text=${product.name}`)).toBeVisible();
    
    // Remove product from cart
    await page.click('button:has-text("Remove")');
    const removeMessage = await page.textContent('.toast-notification');
    expect(removeMessage).toContain(testData.messages.productRemoved);
  });

  test('TC_E2E_003 - User can update profile information', async ({ 
    homePage, 
    page 
  }) => {
    const baseURL = getBaseURL();
    
    // Already authenticated
    await homePage.navigateToHomePage(baseURL);
    
    // Click on profile
    await homePage.click(homePage.userProfileIcon);
    await page.click('a:has-text("Profile Settings")');
    
    // Update profile
    await page.fill('input[name="phone"]', '555-1234');
    await page.fill('textarea[name="address"]', '123 Main St, City, State');
    await page.click('button:has-text("Save Changes")');
    
    // Verify success message
    const successMsg = await page.textContent('.success-message');
    expect(successMsg).toContain('Profile updated successfully');
  });
});
