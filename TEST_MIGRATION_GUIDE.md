# 📋 Test Migration Guide - Align Your Tests with New Framework

## Overview

This guide shows you how to migrate your existing test files to the modern Playwright framework architecture. All your tests can be refactored to follow best practices while maintaining the same functionality.

---

## Migration Checklist

Use this checklist to track your test migration progress:

### UI Tests Migration
- [ ] keyboardaction.spec.js → tests/ui/keyboardActionRefactored.spec.js
- [ ] Login.spec.js → tests/ui/orangeHrmLoginRefactored.spec.js
- [ ] dropdown.spec.js → tests/ui/dropdownFormRefactored.spec.js
- [ ] mousehover.spec.js → tests/ui/popoverHoverRefactored.spec.js
- [ ] fileupload.spec.js → tests/ui/fileUploadRefactored.spec.js
- [ ] Other tests → Create new page objects in src/pages/

### API Tests Migration
- [ ] api-test.spec.js → tests/api/placeholderApiRefactored.spec.js
- [ ] Other API tests → Use apiHelper utilities

### E2E Tests Migration
- [ ] Workflow tests → tests/e2e/
- [ ] Multi-step scenarios → Use multiple page objects

### Smoke Tests Migration
- [ ] Basic checks → tests/smoke/smokeTests.spec.js

---

## Step-by-Step Migration Process

### Step 1: Identify Test Type

```
Your Test File          Test Type        New Location
─────────────────────────────────────────────────────
keyboardaction.spec.js  UI Test          tests/ui/
Login.spec.js           UI Test          tests/ui/
api-test.spec.js        API Test         tests/api/
dropdown.spec.js        UI Test          tests/ui/
mousehover.spec.js      UI Test          tests/ui/
```

### Step 2: Create/Use Page Objects

**For UI Tests:**

```javascript
// OLD - Selectors scattered in test
test('test', async ({ page }) => {
  await page.goto('url');
  await page.locator('#username').fill('user');
  await page.locator('#password').fill('pass');
  await page.click('button[type="submit"]');
});

// NEW - Centralized in Page Object
class LoginPage extends BasePage {
  usernameField = '#username';
  passwordField = '#password';
  loginButton = 'button[type="submit"]';
  
  async login(username, password) {
    await this.fill(this.usernameField, username);
    await this.fill(this.passwordField, password);
    await this.click(this.loginButton);
  }
}
```

**For API Tests:**

```javascript
// OLD - Direct request calls
test('test', async ({ request }) => {
  const response = await request.get('/users/1');
  expect(response.status()).toBe(200);
});

// NEW - Using API helpers
test('test', async ({ apiContext, logger }) => {
  const { getRequest, checkResponseStatus } = 
    require('../../src/utils/apiHelper');
  
  const response = await getRequest(apiContext, '/users/1');
  expect(checkResponseStatus(response, 200)).toBe(true);
  logger.info('API test passed');
});
```

### Step 3: Update Test Structure

Replace direct page object usage with framework patterns:

```javascript
// OLD STRUCTURE
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Test code
});

// NEW STRUCTURE
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const testData = require('../../src/data/testData');

test.describe('Feature Name', () => {
  test('TC_NNN - Clear description', async ({ 
    fixture1, 
    fixture2, 
    logger 
  }) => {
    // Arrange
    logger.info('Starting test');
    
    // Act
    
    // Assert
    
    logger.info('Test passed');
  });
});
```

### Step 4: Use Test Fixtures

```javascript
// Available fixtures to use
test('Example', async ({ 
  loginPage,           // LoginPage instance
  homePage,            // HomePage instance
  authenticatedPage,   // Auto-login
  apiContext,          // API context
  testData,            // Test data
  logger               // Logger
}) => {
  // Use in your test
});
```

### Step 5: Migrate Test Data

Move hard-coded data to testData.js:

```javascript
// OLD - Hard-coded
test('Login', async ({ page }) => {
  await page.fill('#username', 'user@test.com');
  await page.fill('#password', 'password123');
});

// NEW - Centralized test data
test('Login', async ({ testData, loginPage }) => {
  const user = testData.users.validUser;
  await loginPage.login(user.email, user.password);
});
```

### Step 6: Add Logging

Enhance tests with built-in logging:

```javascript
// Add to existing tests
test('TC_001 - Description', async ({ logger, page }) => {
  logger.info('Test started');
  
  // ... test code ...
  
  logger.info('Verifying results');
  expect(result).toBe(expected);
  
  logger.info('Test passed');
});
```

---

## Already Migrated Tests

### ✅ Refactored UI Tests

#### 1. Keyboard Action Test
- **Old File:** tests/keyboardaction.spec.js
- **New File:** tests/ui/keyboardActionRefactored.spec.js
- **Changes:**
  - Created SearchPage class
  - 4 new test cases with descriptive names
  - Added logging
  - Better assertions
  - Centralized selectors

#### 2. OrangeHRM Login Test
- **Old File:** tests/Login.spec.js
- **New File:** tests/ui/orangeHrmLoginRefactored.spec.js
- **Changes:**
  - Created OrangeHRMLoginPage class
  - 5 test cases (login, invalid creds, empty fields, logout)
  - Added screenshot management
  - Comprehensive assertions
  - Error message validation

#### 3. JSON Placeholder API Tests
- **Old File:** tests/api-test.spec.js
- **New File:** tests/api/placeholderApiRefactored.spec.js
- **Changes:**
  - Uses apiHelper utilities
  - 10 test cases covering CRUD operations
  - Better response validation
  - Error handling tests
  - Header validation

---

## Migration Examples

### Example 1: Simple UI Test Migration

**BEFORE:**
```javascript
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://example.com/search');
  await page.locator('input[name="q"]').type('search term');
  await page.locator('button[type="submit"]').click();
  
  const results = await page.locator('.results').count();
  expect(results).toBeGreaterThan(0);
});
```

**AFTER:**
```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = 'input[name="q"]';
    this.submitBtn = 'button[type="submit"]';
    this.results = '.results';
  }
  
  async search(term) {
    await this.page.locator(this.searchInput).type(term);
    await this.page.locator(this.submitBtn).click();
  }
  
  async getResultCount() {
    return await this.page.locator(this.results).count();
  }
}

test('TC_SEARCH_001 - User can search and see results', 
  async ({ page, logger }) => {
    const searchPage = new SearchPage(page);
    
    await page.goto('https://example.com/search');
    await searchPage.search('search term');
    
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
    
    logger.info(`Found ${count} search results`);
  });
```

### Example 2: API Test Migration

**BEFORE:**
```javascript
test('test', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
});
```

**AFTER:**
```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const { getRequest, checkResponseStatus, getResponseJSON } = 
  require('../../src/utils/apiHelper');

test('TC_API_001 - Get users returns valid data', 
  async ({ apiContext, logger }) => {
    logger.info('Fetching users');
    
    const response = await getRequest(apiContext, '/users');
    
    expect(checkResponseStatus(response, 200)).toBe(true);
    
    const users = await getResponseJSON(response);
    expect(users.length).toBeGreaterThan(0);
    
    logger.info(`Retrieved ${users.length} users`);
  });
```

---

## Your Current Tests & Migration Status

### Tests Ready for Migration

| File | Type | Status | Migration Path |
|------|------|--------|-----------------|
| keyboardaction.spec.js | UI | ✅ Done | tests/ui/keyboardActionRefactored.spec.js |
| Login.spec.js | UI | ✅ Done | tests/ui/orangeHrmLoginRefactored.spec.js |
| api-test.spec.js | API | ✅ Done | tests/api/placeholderApiRefactored.spec.js |
| dropdown.spec.js | UI | ⏳ Ready | tests/ui/dropdownFormRefactored.spec.js |
| mousehover.spec.js | UI | ⏳ Ready | tests/ui/popoverHoverRefactored.spec.js |
| fileupload.spec.js | UI | ⏳ Ready | tests/ui/fileUploadRefactored.spec.js |
| applitools.spec.js | Visual | ⏳ Ready | tests/ui/visualTestsRefactored.spec.js |
| handledialog.spec.js | UI | ⏳ Ready | tests/ui/dialogHandlingRefactored.spec.js |
| autocomplete.spec.js | UI | ⏳ Ready | tests/ui/autocompleteRefactored.spec.js |
| framehandling.spec.js | UI | ⏳ Ready | tests/ui/frameHandlingRefactored.spec.js |
| Other tests | Various | ⏳ Ready | Organize by type |

---

## Migration Decision Matrix

Use this matrix to determine the best migration approach:

### Type of Test

```
                Simple UI    Complex UI    API    E2E
             ─────────────────────────────────────────
Page Object   YES          YES           NO     YES
Fixture       YES          YES           YES    YES
Test Data     YES          YES           YES    YES
Helper Func   OPTIONAL     YES           YES    OPTIONAL
Logging       OPTIONAL     YES           YES    YES
```

### Test Complexity Level

```
SIMPLE TEST (< 10 lines)
├─ Create minimal page object
├─ Use basic fixtures
└─ Add logging

MEDIUM TEST (10-30 lines)
├─ Create page object with methods
├─ Use fixtures and test data
├─ Add logging and helpers
└─ Structure with arrange-act-assert

COMPLEX TEST (> 30 lines)
├─ Create full page object
├─ Break into smaller tests
├─ Use fixtures, data, helpers
├─ Add comprehensive logging
└─ Consider E2E vs multiple UI tests
```

---

## Common Migration Issues & Solutions

### Issue 1: Selector Not Working

**Problem:** `Element with text '...' not found`

**Solution:**
```javascript
// Debug in page object
class DebugPage extends BasePage {
  async debugElement(selector) {
    console.log(await this.page.locator(selector).count());
    console.log(await this.page.locator(selector).getAttribute('class'));
  }
}

// Or use pause
await page.pause(); // Opens inspector
```

### Issue 2: Fixture Not Available

**Problem:** `ReferenceError: fixture not defined`

**Solution:**
```javascript
// Correct import
const test = require('../../src/fixtures/fixtures');

// Correct usage
test('name', async ({ loginPage, testData }) => { });
```

### Issue 3: Page Navigation Issues

**Problem:** `Timeout waiting for navigation`

**Solution:**
```javascript
// Use proper wait
await Promise.all([
  page.waitForNavigation(),
  page.click(selector)
]);

// Or use locator's click
await page.locator(selector).click({ waitForNavigation: true });
```

---

## Migration Tips

### ✅ Best Practices

1. **Start Small**
   - Migrate one test at a time
   - Test locally before moving to CI/CD

2. **Use Existing Examples**
   - Reference keyboardActionRefactored.spec.js
   - Reference orangeHrmLoginRefactored.spec.js
   - Reference placeholderApiRefactored.spec.js

3. **Keep Selectors Updated**
   - Review selectors in DevTools
   - Update in page object
   - Keep comments for complex selectors

4. **Add Logging**
   - Log important steps
   - Log assertions
   - Log errors/issues

5. **Test Thoroughly**
   - Run locally: `npm test`
   - Run specific test: `npm test filename.spec.js`
   - Run with debug: `npm run test:debug`

---

## Migration Timeline

### Week 1: Foundation
- [ ] Review framework documentation
- [ ] Study example refactored tests
- [ ] Create 1-2 new page objects

### Week 2: Initial Migration
- [ ] Migrate 3-5 UI tests
- [ ] Migrate 2-3 API tests
- [ ] Set up test data

### Week 3: Expansion
- [ ] Migrate 5-10 more tests
- [ ] Create additional page objects
- [ ] Add custom fixtures if needed

### Week 4: Completion
- [ ] Migrate remaining tests
- [ ] Test all in CI/CD
- [ ] Document any custom patterns

---

## After Migration

### Verification

- [ ] All tests pass locally
- [ ] All tests pass in CI/CD
- [ ] Reports generated correctly
- [ ] Logs captured properly
- [ ] Screenshots on failure work

### Maintenance

- [ ] Keep selectors updated
- [ ] Add new tests using new pattern
- [ ] Update test data as needed
- [ ] Monitor test performance
- [ ] Review reports regularly

---

## Quick Reference - Migration Steps

1. **Identify test type** (UI/API/E2E)
2. **Create page object** (if needed)
3. **Update test imports** to use fixtures
4. **Replace hard-coded selectors** with page object methods
5. **Add test data** from testData.js
6. **Add logging** using logger fixture
7. **Follow Arrange-Act-Assert** pattern
8. **Use proper test naming** (TC_TYPE_NNN)
9. **Add descriptive comments**
10. **Run and verify** locally before committing

---

## Resources

- 📖 COMPREHENSIVE_REFERENCE_GUIDE.md - Full reference
- 📚 FRAMEWORK_DOCUMENTATION.md - Detailed guide
- 🚀 QUICK_START.md - Quick setup
- 📋 README_STRUCTURE.md - Visual structure
- ✅ Example refactored tests in tests/ folders

---

**Your tests are ready to be aligned with the modern framework!**

Start with the refactored examples and gradually migrate your other tests.

**Questions? Refer to the documentation or review example refactored tests.**
