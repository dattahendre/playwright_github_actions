# Quick Start Guide - Modern Playwright Framework

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
npm install --save-dev @playwright/test dotenv
```

### 2. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your configuration
# Update BASE_URL, API_BASE_URL, credentials, etc.
```

### 3. Initialize Browsers
```bash
# Install Playwright browsers
npx playwright install
```

---

## 📝 Create Your First Test

### Step 1: Create Page Object (`src/pages/ProductPage.js`)
```javascript
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  productTitle = '.product-title';
  addToCartBtn = 'button[aria-label="Add to Cart"]';
  
  async navigateToProduct(productId) {
    await this.goto(`/product/${productId}`);
  }
  
  async addToCart() {
    await this.click(this.addToCartBtn);
  }
}

module.exports = ProductPage;
```

### Step 2: Create Test (`tests/ui/productTest.spec.js`)
```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

test.describe('Product Page', () => {
  test('User can add product to cart', async ({ page }) => {
    const ProductPage = require('../../src/pages/ProductPage');
    const productPage = new ProductPage(page);
    
    await productPage.navigateToProduct(123);
    await productPage.addToCart();
    
    // Assert
    const successMsg = await page.textContent('.success-message');
    expect(successMsg).toContain('Added to cart');
  });
});
```

### Step 3: Run Test
```bash
npx playwright test productTest.spec.js
```

---

## 🎯 Common Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run UI tests |
| `npm run test:api` | Run API tests |
| `npm run test:smoke` | Run smoke tests |
| `npm run test:debug` | Debug mode |
| `npm run test:report` | View HTML report |
| `npm run test:headed` | Show browser |

---

## 📂 File Organization Checklist

- ✅ **Page Objects** in `src/pages/`
- ✅ **Tests** in `tests/[type]/`
- ✅ **Test Data** in `src/data/testData.js`
- ✅ **Utilities** in `src/utils/`
- ✅ **Configuration** in `src/config/`
- ✅ **Fixtures** in `src/fixtures/`

---

## 🔍 Test Naming Convention

```
TC_[TYPE]_[NUMBER] - [DESCRIPTION]

Examples:
- TC_001 - User can login with valid credentials
- TC_UI_002 - Login button is disabled with empty fields
- TC_API_003 - Get users list returns 200
- TC_E2E_004 - Complete shopping workflow
- TC_SMOKE_005 - Application loads successfully
```

---

## 🛠️ Debugging Guide

### Run in Debug Mode
```bash
npx playwright test --debug
```

### Use Inspector
```bash
npx playwright test --debug --headed
```

### View Test Report
```bash
npx playwright show-report
```

---

## 📊 Test Structure Template

```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('TC_NNN - Test description', async ({ 
    loginPage, 
    testData, 
    logger 
  }) => {
    // Arrange
    logger.info('Starting test...');
    
    // Act
    await loginPage.login(testData.users.validUser.email, 
                         testData.users.validUser.password);
    
    // Assert
    expect(page.url()).toContain('/home');
    logger.info('Test passed!');
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});
```

---

## 🌐 Environment Variables Quick Reference

```
# Application
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000/api

# Browser
HEADLESS=true
SLOW_MO=0

# Logging
LOG_LEVEL=info

# Test Execution
RETRY_COUNT=0
PARALLEL_WORKERS=4

# Reporting
REPORT_TYPE=html
SCREENSHOT_ON_FAILURE=true
RECORD_VIDEO=false
```

---

## 🐛 Troubleshooting

### Tests Not Finding Elements
- Check selector in DevTools
- Verify element is in DOM
- Add wait time: `await page.waitForSelector(selector)`
- Use `--debug` mode

### Tests Timeout
- Increase timeout in config
- Use `--headed` to watch execution
- Check network requests

### Fixtures Not Available
- Import fixtures: `const test = require('../../src/fixtures/fixtures')`
- Use fixture in test parameters

### Reports Not Generated
- Check report path in config
- Verify write permissions
- Run: `npx playwright show-report`

---

## 📚 Next Steps

1. ✅ Create page objects for your pages
2. ✅ Add test data to `testData.js`
3. ✅ Write UI tests in `tests/ui/`
4. ✅ Write API tests in `tests/api/`
5. ✅ Create E2E tests in `tests/e2e/`
6. ✅ Run test suite
7. ✅ View reports

---

## 💡 Tips & Tricks

### Reuse Test Data
```javascript
const test = require('../../src/fixtures/fixtures');
const testData = require('../../src/data/testData');

test('Login', async ({ page }) => {
  const user = testData.users.validUser;
  // Use user.email, user.password
});
```

### Use Retry for Flaky Tests
```javascript
import { retryWithBackoff } from '../../src/utils/testUtils';

await retryWithBackoff(async () => {
  // Flaky operation
}, 3, 1000);
```

### Generate Test Data
```javascript
const { generateRandomEmail } = require('../../src/utils/testUtils');
const email = generateRandomEmail();
```

---

**For detailed documentation, see:** [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md)
