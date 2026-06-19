/**
 * apiTests.spec.js - API Tests
 * Tests API endpoints and responses
 */

const test = require('../../src/fixtures/fixtures');
const { 
  getRequest, 
  postRequest, 
  checkResponseStatus,
  getResponseJSON 
} = require('../../src/utils/apiHelper');
const testData = require('../../src/data/testData');
const { expect } = require('@playwright/test');

test.describe('API Tests', () => {

  test('TC_API_001 - Get users list', async ({ apiContext }) => {
    // Act
    const response = await getRequest(apiContext, '/users');
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 200)).toBe(true);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test('TC_API_002 - Get specific user', async ({ apiContext }) => {
    // Arrange
    const userId = 1;
    
    // Act
    const response = await getRequest(apiContext, `/users/${userId}`);
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 200)).toBe(true);
    expect(responseBody.id).toBe(userId);
    expect(responseBody.email).toBeDefined();
  });

  test('TC_API_003 - Create new user', async ({ apiContext, testData }) => {
    // Arrange
    const newUser = testData.newUser;
    
    // Act
    const response = await postRequest(apiContext, '/users', {
      email: newUser.email,
      password: newUser.password,
      name: newUser.name
    });
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 201)).toBe(true);
    expect(responseBody.email).toBe(newUser.email);
    expect(responseBody.id).toBeDefined();
  });

  test('TC_API_004 - User login endpoint', async ({ apiContext }) => {
    // Arrange
    const user = testData.users.validUser;
    
    // Act
    const response = await postRequest(apiContext, '/auth/login', {
      email: user.email,
      password: user.password
    });
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 200)).toBe(true);
    expect(responseBody.token).toBeDefined();
    expect(responseBody.user.email).toBe(user.email);
  });

  test('TC_API_005 - User login fails with invalid credentials', async ({ apiContext }) => {
    // Arrange
    const user = testData.users.invalidUser;
    
    // Act
    const response = await postRequest(apiContext, '/auth/login', {
      email: user.email,
      password: user.password
    });
    
    // Assert
    expect(checkResponseStatus(response, 401)).toBe(true);
  });

  test('TC_API_006 - Get products list', async ({ apiContext }) => {
    // Act
    const response = await getRequest(apiContext, '/products');
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 200)).toBe(true);
    expect(Array.isArray(responseBody)).toBe(true);
  });

  test('TC_API_007 - Get product by category', async ({ apiContext }) => {
    // Arrange
    const category = 'Electronics';
    
    // Act
    const response = await getRequest(apiContext, `/products?category=${category}`);
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 200)).toBe(true);
    expect(responseBody.every(p => p.category === category)).toBe(true);
  });

  test('TC_API_008 - Add product to cart', async ({ apiContext }) => {
    // Arrange
    const product = testData.products.electronics;
    
    // Act
    const response = await postRequest(apiContext, '/cart', {
      productId: product.id,
      quantity: 1
    });
    const responseBody = await getResponseJSON(response);
    
    // Assert
    expect(checkResponseStatus(response, 201)).toBe(true);
    expect(responseBody.items).toBeDefined();
  });
});
