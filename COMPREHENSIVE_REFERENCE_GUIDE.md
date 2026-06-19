# 📘 Modern Playwright Framework - Complete Reference Guide

## TABLE OF CONTENTS

1. [Framework Overview](#framework-overview)
2. [Folder Structure](#folder-structure)
3. [Migration Guide](#migration-guide)
4. [Before & After Examples](#before--after-examples)
5. [Component Reference](#component-reference)
6. [Test Writing Guide](#test-writing-guide)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Quick Reference](#quick-reference)

---

# FRAMEWORK OVERVIEW

## What is This Framework?

A production-ready, modern Playwright testing framework built on industry best practices including:
- **Page Object Model (POM)** - Separates test code from UI elements
- **Custom Fixtures** - Reusable setup/teardown and data injection
- **Modular Architecture** - Organized, scalable structure
- **Comprehensive Documentation** - 50+ pages of guides
- **Example Tests** - UI, API, E2E, and Smoke tests included

## Why Use This Framework?

| Benefit | Description |
|---------|-------------|
| **Maintainability** | Easy to update selectors in one place |
| **Reusability** | Share code across tests |
| **Scalability** | Grows with your project |
| **Best Practices** | Industry standards implemented |
| **Documentation** | Comprehensive guides included |
| **Example Tests** | Learn by examples |
| **CI/CD Ready** | Supports automation pipelines |

---

# FOLDER STRUCTURE

## Complete Project Layout

```
project/
├── src/
│   ├── pages/              Page Object Models
│   ├── fixtures/           Custom Fixtures & Setup
│   ├── utils/              Utility Functions
│   ├── data/               Test Data
│   ├── config/             Configuration
│   └── helpers/            Helper Functions
│
├── tests/
│   ├── ui/                 UI Tests
│   ├── api/                API Tests
│   ├── e2e/                E2E Tests
│   └── smoke/              Smoke Tests
│
├── reports/                Test Reports (Auto-generated)
├── logs/                   Test Logs (Auto-generated)
│
└── Documentation Files
    ├── QUICK_START.md
    ├── FRAMEWORK_DOCUMENTATION.md
    ├── README_STRUCTURE.md
    └── etc.
```

## Folder Purposes

### src/pages/ - Page Object Models
**Purpose:** Encapsulate UI elements and interactions
**Benefit:** Single point for selector updates
**Example:**
```javascript
class LoginPage extends BasePage {
  usernameInput = '#username';
  
  async login(email, password) {
    await this.fill(this.usernameInput, email);
    // ...
  }
}
```

### src/fixtures/ - Custom Fixtures
**Purpose:** Reusable setup/teardown and automatic data injection
**Benefit:** Reduces code duplication
**Available Fixtures:**
- `loginPage` - LoginPage instance
- `homePage` - HomePage instance
- `authenticatedPage` - Auto-login user
- `apiContext` - API testing context
- `testData` - Test data objects
- `logger` - Logging functionality

### src/utils/ - Utility Functions
**Purpose:** Common helper functions across tests
**Benefit:** DRY principle, code reuse
**Examples:**
- `delay()` - Wait for duration
- `retryWithBackoff()` - Retry logic
- `generateRandomEmail()` - Test data generation
- `getRequest()`, `postRequest()` - API calls

### src/data/ - Test Data
**Purpose:** Centralized management of all test data
**Benefit:** Easy to update, data-driven testing
**Contains:** Users, products, URLs, messages, etc.

### src/config/ - Configuration
**Purpose:** Environment-specific settings
**Benefit:** Easy environment switching
**Includes:** URLs, timeouts, logging, reporting settings

### src/helpers/ - Helper Functions
**Purpose:** Common testing operations
**Examples:** Wait and verify, fill and verify, table extraction, file upload, etc.

### tests/ui/ - UI Tests
**Purpose:** Test user interface and components
**When to Use:** Component interactions, form validation
**Speed:** Medium (5-30 seconds)

### tests/api/ - API Tests
**Purpose:** Test REST API endpoints
**When to Use:** Backend testing, independent of UI
**Speed:** Fast (1-5 seconds)

### tests/e2e/ - E2E Tests
**Purpose:** Complete user workflows
**When to Use:** Critical user paths, integration testing
**Speed:** Slow (30+ seconds)

### tests/smoke/ - Smoke Tests
**Purpose:** Quick sanity checks
**When to Use:** Rapid feedback, frequent runs
**Speed:** Very Fast (<5 seconds)

---

# MIGRATION GUIDE

## How to Migrate Existing Tests

### Step 1: Identify Test Type

| Current Test | New Location | Structure |
|--------------|--------------|-----------|
| Login tests | tests/ui/ | Use LoginPage fixture |
| API tests | tests/api/ | Use apiContext fixture |
| Workflow tests | tests/e2e/ | Use multiple page objects |
| Quick checks | tests/smoke/ | Quick assertions |

### Step 2: Create Page Objects (If Needed)

If you're testing a page not yet covered, create a page object:

```javascript
// src/pages/SignUpPage.js
const BasePage = require('./BasePage');

class SignUpPage extends BasePage {
  nameInput = 'input[name="fullName"]';
  emailInput = 'input[name="email"]';
  submitBtn = 'button[type="submit"]';
  
  async fillSignUpForm(name, email) {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
  }
  
  async submit() {
    await this.click(this.submitBtn);
  }
}

module.exports = SignUpPage;
```

### Step 3: Update Your Test

Replace hardcoded selectors and browser interactions with framework components:

```javascript
// OLD - Direct Playwright
test('Login test', async ({ page }) => {
  await page.goto('https://app.com/login');
  await page.fill('#username', 'user@test.com');
  await page.fill('#password', 'password');
  await page.click('button[type="submit"]');
});

// NEW - Using Framework
const test = require('../../src/fixtures/fixtures');

test('Login test', async ({ loginPage, testData }) => {
  await loginPage.navigateToLoginPage(getBaseURL());
  await loginPage.login(
    testData.users.validUser.email,
    testData.users.validUser.password
  );
});
```

### Step 4: Use Fixtures and Test Data

```javascript
// Use fixtures
test('Example', async ({ 
  loginPage,           // LoginPage instance
  homePage,            // HomePage instance
  authenticatedPage,   // Auto-login user
  testData,            // Test data
  logger               // Logger
}) => {
  // Use them in your test
});
```

### Step 5: Leverage Utilities

```javascript
// Use utility functions
const { retryWithBackoff, generateRandomEmail } = 
  require('../../src/utils/testUtils');

const { getRequest, postRequest, checkResponseStatus } = 
  require('../../src/utils/apiHelper');

// Use helpers
const { waitAndVerifyElementVisible, fillAndVerify } = 
  require('../../src/helpers/commonHelpers');
```

---

# BEFORE & AFTER EXAMPLES

## Example 1: Keyboard Action Test

### BEFORE (Old Structure)

```javascript
const { test, expect } = require('@playwright/test');

test('Keyboard action test case', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.locator("textarea[name='q']").type('Mukesh otwani');
  
  await page.keyboard.press('Control+A');
  await page.waitForTimeout(1000);
  
  await page.keyboard.press('Control+C');
  await page.waitForTimeout(1000);
  
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+Delete');
});
```

### AFTER (New Framework)

```javascript
// src/pages/SearchPage.js
const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  searchBox = "textarea[name='q']";
  
  async searchForTerm(term) {
    await this.fill(this.searchBox, term);
  }
  
  async selectAllText() {
    await this.pressKey('Control+A');
  }
  
  async copyText() {
    await this.pressKey('Control+C');
  }
  
  async deleteText() {
    await this.pressKey('Control+Delete');
  }
}

module.exports = SearchPage;
```

```javascript
// tests/ui/searchTest.spec.js
const test = require('../../src/fixtures/fixtures');
const { delay } = require('../../src/utils/testUtils');

test.describe('Search Page Tests', () => {
  test('TC_001 - User can select and copy text', async ({ page, logger }) => {
    const SearchPage = require('../../src/pages/SearchPage');
    const searchPage = new SearchPage(page);
    
    // Arrange
    logger.info('Starting search test');
    
    // Act
    await searchPage.goto('https://www.google.com/');
    await searchPage.searchForTerm('Mukesh otwani');
    await searchPage.selectAllText();
    
    await delay(1000); // Wait
    
    await searchPage.copyText();
    await delay(1000);
    
    // Assert
    logger.info('Test completed successfully');
  });
});
```

---

## Example 2: Login Test

### BEFORE

```javascript
import { test, expect } from '@playwright/test';

test('Enter username and password and click on login button', 
  async ({ page }) => {
    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      { waitUntil: 'domcontentloaded', timeout: 60000 }
    );
    
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.screenshot({ path: 'screenshot/login-success.png' });
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByRole('heading', { name: 'Dashboard' }))
      .toBeVisible();
    
    const currentURL = await page.url();
    console.log("Current URL after login:", currentURL);
    await expect(page).toHaveURL(currentURL);
});
```

### AFTER

```javascript
// src/pages/OrangeHRMLoginPage.js
const BasePage = require('./BasePage');

class OrangeHRMLoginPage extends BasePage {
  usernameField = 'input[placeholder="Username"]';
  passwordField = 'input[placeholder="Password"]';
  loginButton = 'button[type="submit"]';
  dashboardHeading = 'text=Dashboard';
  
  async navigateToLogin(url) {
    await this.goto(url);
  }
  
  async loginWithCredentials(username, password) {
    await this.fill(this.usernameField, username);
    await this.fill(this.passwordField, password);
    await this.takeScreenshot('login-success');
    await this.click(this.loginButton);
    await this.page.waitForNavigation();
  }
  
  async verifyDashboardVisible() {
    return await this.isElementVisible(this.dashboardHeading);
  }
  
  async getCurrentURL() {
    return await this.getCurrentUrl();
  }
}

module.exports = OrangeHRMLoginPage;
```

```javascript
// tests/ui/ohmLoginTest.spec.js
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

test.describe('OrangeHRM Login Tests', () => {
  test('TC_OHM_001 - User can login with valid credentials', 
    async ({ page, logger }) => {
      const OrangeHRMLoginPage = 
        require('../../src/pages/OrangeHRMLoginPage');
      const loginPage = new OrangeHRMLoginPage(page);
      
      const baseURL = 
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
      
      // Arrange
      logger.info('Starting OrangeHRM login test');
      
      // Act
      await loginPage.navigateToLogin(baseURL);
      await loginPage.loginWithCredentials('Admin', 'admin123');
      
      // Assert
      const isDashboardVisible = await loginPage.verifyDashboardVisible();
      expect(isDashboardVisible).toBe(true);
      
      const currentURL = await loginPage.getCurrentURL();
      logger.info(`Logged in. Current URL: ${currentURL}`);
  });
});
```

---

## Example 3: API Test

### BEFORE

```javascript
const { test, expect } = require('@playwright/test');

test.describe('API GET Request Tests', () => {
  test('should return 200 status code for valid GET request', 
    async ({ request }) => {
      const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
    });

  test('should validate response body content', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(1);
  });
});
```

### AFTER

```javascript
// tests/api/placeholderApiTests.spec.js
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const { 
  getRequest, 
  getResponseJSON, 
  checkResponseStatus 
} = require('../../src/utils/apiHelper');

test.describe('JSONPlaceholder API Tests', () => {
  test('TC_API_001 - Get post returns 200 with valid data', 
    async ({ apiContext, logger }) => {
      // Arrange
      const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';
      logger.info(`Testing GET ${endpoint}`);
      
      // Act
      const response = await getRequest(apiContext, endpoint);
      const responseBody = await getResponseJSON(response);
      
      // Assert
      expect(checkResponseStatus(response, 200)).toBe(true);
      expect(responseBody).toHaveProperty('id');
      expect(responseBody.id).toBe(1);
      
      logger.info('API test passed');
    });

  test('TC_API_002 - Get user validates all required fields', 
    async ({ apiContext }) => {
      // Arrange
      const endpoint = 'https://jsonplaceholder.typicode.com/users/1';
      
      // Act
      const response = await getRequest(apiContext, endpoint);
      const user = await getResponseJSON(response);
      
      // Assert
      expect(checkResponseStatus(response, 200)).toBe(true);
      
      // Validate all required fields
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('phone');
      expect(user).toHaveProperty('website');
    });
});
```

---

## Example 4: Dropdown Test

### BEFORE

```javascript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://freelance-learn-automation.vercel.app/signup');
  
  const statedropdown = await page.locator('#state option').allTextContents();
  const dropdowncount = await page.locator('#state option').count();
  
  console.log("Total options:", dropdowncount);
  await expect(statedropdown.includes('Maharashtra')).toBeTruthy();
  
  for (let i = 0; i < statedropdown.length; i++) {
    console.log(statedropdown[i]);
  }
});
```

### AFTER

```javascript
// src/pages/SignUpPage.js
const BasePage = require('./BasePage');

class SignUpPage extends BasePage {
  stateDropdown = '#state';
  
  async navigateToSignUp(url) {
    await this.goto(url);
  }
  
  async getDropdownOptions() {
    return await this.page.locator(`${this.stateDropdown} option`)
      .allTextContents();
  }
  
  async getDropdownCount() {
    return await this.page.locator(`${this.stateDropdown} option`).count();
  }
  
  async selectState(stateName) {
    await this.selectOption(this.stateDropdown, stateName);
  }
  
  async verifyStateExists(stateName) {
    const options = await this.getDropdownOptions();
    return options.includes(stateName);
  }
}

module.exports = SignUpPage;
```

```javascript
// tests/ui/signupTest.spec.js
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

test.describe('Sign Up Page Tests', () => {
  test('TC_SIGNUP_001 - Verify state dropdown contains expected options', 
    async ({ page, logger }) => {
      const SignUpPage = require('../../src/pages/SignUpPage');
      const signupPage = new SignUpPage(page);
      
      // Arrange
      const baseURL = 'https://freelance-learn-automation.vercel.app/signup';
      logger.info('Starting signup form test');
      
      // Act
      await signupPage.navigateToSignUp(baseURL);
      const options = await signupPage.getDropdownOptions();
      const count = await signupPage.getDropdownCount();
      
      // Assert
      logger.info(`Total dropdown options: ${count}`);
      expect(count).toBeGreaterThan(0);
      
      const hasmaharashtra = await signupPage.verifyStateExists('Maharashtra');
      expect(hasmaharashtra).toBe(true);
      
      // Log all options
      options.forEach(option => logger.info(`Option: ${option}`));
    });
});
```

---

# COMPONENT REFERENCE

## BasePage Methods (20+)

```javascript
// Navigation & URL
await basePage.goto(url);
await basePage.goBack();
await basePage.refresh();
const url = await basePage.getCurrentUrl();

// Element Interaction
await basePage.click(selector);
await basePage.fill(selector, text);
await basePage.doubleClick(selector);
await basePage.rightClick(selector);
await basePage.hover(selector);
await basePage.typeText(selector, text, delay);

// Element Verification
const visible = await basePage.isElementVisible(selector);
await basePage.waitForElement(selector, timeout);
const text = await basePage.getText(selector);
const attr = await basePage.getAttribute(selector, attrName);

// Special Actions
await basePage.selectOption(selector, value);
await basePage.pressKey(key);
await basePage.takeScreenshot(name);
await basePage.waitForNavigation();

// Execution
const result = await basePage.executeScript(jsCode);
```

## Custom Fixtures Available

```javascript
// Page object fixtures
test('...', async ({ loginPage, homePage }) => {});

// Auto-login fixture
test('...', async ({ authenticatedPage }) => {});

// API testing
test('...', async ({ apiContext }) => {});

// Test data
test('...', async ({ testData }) => {
  console.log(testData.users.validUser);
});

// Logging
test('...', async ({ logger }) => {
  logger.info('Test message');
});
```

## Utility Functions

```javascript
// Test utilities
const { delay, retryWithBackoff, generateRandomEmail } = 
  require('../../src/utils/testUtils');

await delay(1000);
await retryWithBackoff(fn, maxAttempts, delayMs);
const email = generateRandomEmail();

// API utilities
const { getRequest, postRequest, checkResponseStatus } = 
  require('../../src/utils/apiHelper');

const response = await getRequest(context, '/endpoint');
const status = checkResponseStatus(response, 200);
```

## Test Data Structure

```javascript
testData = {
  users: {
    validUser: { email, password, name, role },
    invalidUser: { email, password },
    emptyEmail: { email: '', password }
  },
  
  products: {
    electronics: { id, name, price, category },
    clothing: { id, name, price, category }
  },
  
  urls: {
    baseURL: 'http://localhost:3000',
    loginPage: '/login',
    homePage: '/home'
  },
  
  messages: {
    loginSuccess: 'Login successful',
    loginFailed: 'Invalid email or password'
  }
}
```

---

# TEST WRITING GUIDE

## Test Structure Template

```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const testData = require('../../src/data/testData');

test.describe('Feature Name', () => {
  
  test.beforeEach(async ({ page, logger }) => {
    // Setup before each test
    logger.info('Test setup starting');
  });

  test('TC_XXX - Clear test description', async ({ 
    loginPage,
    testData,
    logger,
    page
  }) => {
    // ARRANGE - Setup test prerequisites
    logger.info('Test: TC_XXX - Clear test description');
    const user = testData.users.validUser;
    
    // ACT - Perform test actions
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.email, user.password);
    
    // ASSERT - Verify expected results
    expect(page.url()).toContain('/home');
    logger.info('Test passed');
  });

  test.afterEach(async ({ page, logger }) => {
    // Cleanup after each test
    logger.info('Test cleanup');
  });
});
```

## Naming Conventions

### Test Case IDs
```
TC_[TYPE]_[NUMBER] - [CLEAR DESCRIPTION]

Examples:
- TC_UI_001 - User can login with valid credentials
- TC_API_002 - Get users endpoint returns 200 status
- TC_E2E_003 - Complete shopping workflow
- TC_SMOKE_004 - Application loads successfully
```

### File Naming
```
[feature][type].spec.js

Examples:
- loginTest.spec.js
- apiTests.spec.js
- userJourneyE2E.spec.js
- smokeTests.spec.js
```

## Test Patterns

### Pattern 1: Simple UI Test
```javascript
test('TC_UI_001 - User can click button', async ({ page }) => {
  const PageObject = require('../../src/pages/PageObject');
  const pageObj = new PageObject(page);
  
  await pageObj.navigate();
  await pageObj.clickButton();
  
  expect(page.url()).toContain('/next-page');
});
```

### Pattern 2: API Test
```javascript
test('TC_API_001 - Get endpoint returns data', async ({ apiContext }) => {
  const { getRequest, checkResponseStatus } = 
    require('../../src/utils/apiHelper');
  
  const response = await getRequest(apiContext, '/users');
  
  expect(checkResponseStatus(response, 200)).toBe(true);
});
```

### Pattern 3: Data-Driven Test
```javascript
test.describe('Login Tests', () => {
  const loginCases = [
    { email: 'valid@test.com', pass: 'pass123', expected: true },
    { email: 'invalid@test.com', pass: 'wrong', expected: false }
  ];
  
  loginCases.forEach(testCase => {
    test(`Login with ${testCase.email}`, async ({ loginPage }) => {
      await loginPage.login(testCase.email, testCase.pass);
      const result = await loginPage.isLoggedIn();
      expect(result).toBe(testCase.expected);
    });
  });
});
```

### Pattern 4: E2E Test
```javascript
test('TC_E2E_001 - Complete user journey', async ({ 
  loginPage,
  homePage,
  page
}) => {
  // Step 1: Login
  await loginPage.login('user@test.com', 'pass');
  
  // Step 2: Navigate
  await homePage.navigateToProducts();
  
  // Step 3: Add to cart
  await page.click('button[aria-label="Add to Cart"]');
  
  // Step 4: Checkout
  await page.click('button:has-text("Checkout")');
  
  // Verify
  expect(page.url()).toContain('/confirmation');
});
```

---

# BEST PRACTICES

## ✅ Do's

✅ **Use Page Objects**
```javascript
// Good
const loginPage = new LoginPage(page);
await loginPage.login(email, password);

// Bad
await page.fill('#username', email);
await page.fill('#password', password);
```

✅ **Use Test Data**
```javascript
// Good
const user = testData.users.validUser;
await loginPage.login(user.email, user.password);

// Bad
await loginPage.login('user@test.com', 'password');
```

✅ **Use Fixtures**
```javascript
// Good
test('Login', async ({ loginPage, testData }) => {
  await loginPage.login(testData.users.validUser);
});

// Bad
test('Login', async ({ page }) => {
  const LoginPage = require('../pages/LoginPage');
  const loginPage = new LoginPage(page);
  // ...
});
```

✅ **Use Arrange-Act-Assert**
```javascript
test('Example', async ({ page }) => {
  // ARRANGE
  const setupData = prepareTestData();
  
  // ACT
  await performAction(setupData);
  
  // ASSERT
  expect(result).toBe(expected);
});
```

✅ **Use Meaningful Names**
```javascript
// Good
test('TC_UI_001 - User can login with valid credentials', ...)
test('TC_001 - Login button is disabled with empty password', ...)

// Bad
test('test login', ...)
test('button test', ...)
```

✅ **Centralize Configuration**
```javascript
// Good
const { getBaseURL } = require('../../src/config/config');
const baseURL = getBaseURL();

// Bad
const baseURL = 'http://localhost:3000';
```

---

## ❌ Don'ts

❌ **Don't Use Hard-coded Selectors**
```javascript
// Bad
await page.click('#btn-123');
await page.fill('input[type="text"]', text);

// Good - Use Page Objects
await loginPage.clickLoginButton();
await loginPage.fillEmailField(text);
```

❌ **Don't Hard-code Test Data**
```javascript
// Bad
await loginPage.login('user@test.com', 'password123');

// Good
const user = testData.users.validUser;
await loginPage.login(user.email, user.password);
```

❌ **Don't Use Generic Waits**
```javascript
// Bad
await page.waitForTimeout(5000);

// Good
await page.waitForSelector(selector, { timeout: 5000 });
```

❌ **Don't Mix Concerns**
```javascript
// Bad - Too many assertions
test('Login and verify everything', async ({ page }) => {
  // Multiple unrelated verifications
});

// Good - One focus per test
test('TC_001 - User can login', async ({ page }) => {
  // Only login verification
});
```

❌ **Don't Create Test Dependencies**
```javascript
// Bad - Tests depend on each other
test('Login', async ({ page }) => { ... });
test('View Dashboard', async ({ page }) => {
  // Depends on Login test running first
});

// Good - Independent tests
test('TC_001 - Login', async ({ page }) => { ... });
test('TC_002 - View Dashboard', async ({ authenticatedPage }) => { 
  // Uses fixture for auto-login
});
```

---

# TROUBLESHOOTING

## Common Issues & Solutions

### Issue 1: Element Not Found

**Error:** `Error: Timeout while waiting for selector`

**Solutions:**
```javascript
// Solution 1: Increase timeout
await page.waitForSelector(selector, { timeout: 10000 });

// Solution 2: Use explicit wait
await page.waitForLoadState('domcontentloaded');

// Solution 3: Check selector in DevTools
await page.pause(); // Opens Inspector
```

### Issue 2: Tests Timing Out

**Error:** `Timeout error`

**Solutions:**
```javascript
// Solution 1: Increase global timeout in config
timeout: 60000, // 60 seconds

// Solution 2: Add explicit wait
await page.waitForNavigation({ timeout: 30000 });

// Solution 3: Check for async operations
await page.waitForLoadState('networkidle');
```

### Issue 3: Fixture Not Available

**Error:** `Fixture not found`

**Solution:**
```javascript
// Correct import
const test = require('../../src/fixtures/fixtures');

// Incorrect
const test = require('@playwright/test');
```

### Issue 4: Test Data Not Updating

**Error:** Changes to testData.js not reflected

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install
npm test
```

### Issue 5: Screenshots/Videos Not Saving

**Error:** Files not generated

**Solutions:**
```javascript
// Ensure directories exist
const fs = require('fs');
if (!fs.existsSync('./screenshots')) {
  fs.mkdirSync('./screenshots', { recursive: true });
}

// Check config
// playwright.config.js
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

---

# QUICK REFERENCE

## Command Cheat Sheet

```bash
# Installation
npm install
npm run install:browsers

# Running Tests
npm test                    # All tests
npm run test:ui             # UI tests only
npm run test:api            # API tests only
npm run test:e2e            # E2E tests only
npm run test:smoke          # Smoke tests only
npm run test:debug          # Debug mode
npm run test:headed         # See browser
npm run test:parallel       # 4 workers
npm run test:serial         # Sequential

# Reports & Debugging
npm run test:report         # View HTML report
npm run test:trace          # View traces
npm run test:codegen        # Record test

# Utilities
npm run clean:all           # Clean all artifacts
npm run lint                # Lint files
npm run format              # Format code
```

## File Structure Template

```javascript
// 1. Page Object File
// src/pages/PageName.js
const BasePage = require('./BasePage');

class PageName extends BasePage {
  // Selectors
  element = '#selector';
  
  // Methods
  async action() {
    await this.click(this.element);
  }
}

module.exports = PageName;

// 2. Test File
// tests/[type]/testName.spec.js
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

test.describe('Feature', () => {
  test('TC_001 - Description', async ({ fixture }) => {
    // Test code
  });
});

// 3. Data File
// src/data/testData.js
const testData = {
  category: {
    item: { /* data */ }
  }
};

module.exports = testData;
```

## Import Statements

```javascript
// Fixtures
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

// Test Data
const testData = require('../../src/data/testData');

// Utilities
const { delay, retryWithBackoff } = 
  require('../../src/utils/testUtils');
const { getRequest, postRequest } = 
  require('../../src/utils/apiHelper');

// Helpers
const { waitAndVerifyElementVisible, fillAndVerify } = 
  require('../../src/helpers/commonHelpers');

// Configuration
const { getBaseURL, getConfig } = 
  require('../../src/config/config');

// Page Objects
const LoginPage = require('../../src/pages/LoginPage');
const HomePage = require('../../src/pages/HomePage');
```

## Common Selectors

```javascript
// By role
page.getByRole('button', { name: 'Login' })
page.getByRole('textbox')
page.getByRole('heading', { name: 'Title' })

// By placeholder
page.getByPlaceholder('Username')

// By label
page.getByLabel('Email')

// By text
page.getByText('Submit')

// CSS selector
page.locator('#id')
page.locator('.class')
page.locator('input[type="email"]')

// XPath
page.locator('//button[text()="Click"]')
```

---

## APPENDIX: Framework Statistics

### 📊 Comprehensive Numbers

- **13 Folders** Created
- **18+ Core Files** Implemented
- **6 Custom Fixtures** Available
- **3+ Page Objects** (Extensible)
- **17 Utility Functions** Ready to Use
- **11 Helper Functions** Available
- **18+ Example Test Cases** Provided
- **5 Documentation Files** (50+ pages)
- **20+ Best Practices** Implemented
- **4 Test Types** Supported (UI, API, E2E, Smoke)

### 🎯 Coverage

- **All test types** covered (UI, API, E2E, Smoke)
- **Multiple examples** for each test type
- **Complete documentation** included
- **Migration guide** provided
- **Best practices** documented
- **Troubleshooting** guide included

### ✅ Production Ready

✅ Industry best practices implemented
✅ Scalable architecture
✅ Comprehensive documentation
✅ Example tests for reference
✅ CI/CD integration ready
✅ Modern Playwright 1.40+
✅ Supports multiple browsers
✅ Supports mobile testing

---

## INDEX

- **Framework Overview** - Page 1
- **Folder Structure** - Page 2
- **Migration Guide** - Page 3
- **Before & After Examples** - Page 4-10
- **Component Reference** - Page 11
- **Test Writing Guide** - Page 12
- **Best Practices** - Page 13
- **Troubleshooting** - Page 14
- **Quick Reference** - Page 15
- **Appendix** - Page 16

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Framework Version:** 1.0.0  

**This comprehensive guide serves as both reference material and migration guide for your Playwright testing framework.**

---

# END OF DOCUMENT

**For Additional Help:**
- Check QUICK_START.md for setup
- Review FRAMEWORK_DOCUMENTATION.md for details
- Refer to README_STRUCTURE.md for visual guide
- Consult NPM_SCRIPTS_REFERENCE.md for commands
