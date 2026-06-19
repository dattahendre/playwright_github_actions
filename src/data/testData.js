/**
 * testData.js - Centralized test data
 * Contains test data used across tests
 */

const testData = {
  users: {
    validAdmin: {
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      name: 'Admin User'
    },
    validUser: {
      email: 'user@example.com',
      password: 'User@123',
      role: 'user',
      name: 'Regular User'
    },
    invalidUser: {
      email: 'invalid@example.com',
      password: 'WrongPassword123'
    },
    emptyEmail: {
      email: '',
      password: 'Password@123'
    },
    emptyPassword: {
      email: 'user@example.com',
      password: ''
    }
  },

  products: {
    electronics: {
      id: 'PROD_001',
      name: 'Laptop',
      price: 999.99,
      category: 'Electronics'
    },
    clothing: {
      id: 'PROD_002',
      name: 'T-Shirt',
      price: 29.99,
      category: 'Clothing'
    },
    books: {
      id: 'PROD_003',
      name: 'JavaScript Guide',
      price: 49.99,
      category: 'Books'
    }
  },

  urls: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    loginPage: '/login',
    homePage: '/home',
    productsPage: '/products',
    cartPage: '/cart',
    checkoutPage: '/checkout'
  },

  messages: {
    loginSuccess: 'Login successful',
    loginFailed: 'Invalid email or password',
    logoutSuccess: 'You have been logged out',
    productAdded: 'Product added to cart',
    productRemoved: 'Product removed from cart',
    orderPlaced: 'Order placed successfully'
  },

  testCases: {
    validLogin: {
      description: 'User can login with valid credentials',
      email: 'user@example.com',
      password: 'User@123'
    },
    invalidLogin: {
      description: 'User cannot login with invalid credentials',
      email: 'user@example.com',
      password: 'WrongPassword'
    },
    expiredToken: {
      description: 'User session expires after timeout',
      timeout: 1800000 // 30 minutes
    }
  }
};

module.exports = testData;
