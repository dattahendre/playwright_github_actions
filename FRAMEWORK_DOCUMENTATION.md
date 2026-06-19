# Modern Playwright Framework Architecture

This document provides a comprehensive guide to the modern Playwright testing framework structure, including folder organization, functionality, and best practices.

## 📁 Project Structure Overview

```
Playwright/
├── src/
│   ├── pages/                    # Page Object Models
│   │   ├── BasePage.js          # Base class with common methods
│   │   ├── LoginPage.js         # Login page object
│   │   └── HomePage.js          # Home page object
│   │
│   ├── fixtures/                # Custom Playwright Fixtures
│   │   └── fixtures.js          # Reusable fixtures & setup/teardown
│   │
│   ├── utils/                   # Utility Functions
│   │   ├── testUtils.js         # Common test helpers
│   │   └── apiHelper.js         # API testing helpers
│   │
│   ├── data/                    # Test Data
│   │   └── testData.js          # Centralized test data
│   │
│   ├── config/                  # Configuration Files
│   │   └── config.js            # Environment & app configuration
│   │
│   └── helpers/                 # Helper Functions
│
├── tests/                       # Test Files (Organized by Type)
│   ├── ui/                      # UI/Component Tests
│   │   └── loginTest.spec.js   # Example UI test
│   │
│   ├── api/                     # API Tests
│   │   └── apiTests.spec.js    # Example API test
│   │
│   ├── e2e/                     # End-to-End Tests
│   │   └── completeUserJourney.spec.js # Example E2E test
│   │
│   └── smoke/                   # Smoke Tests
│       └── smokeTests.spec.js  # Quick sanity tests
│
├── reports/                     # Test Reports
│       ├── index.html          # HTML report
│       └── data/               # Report data files
│
├── logs/                        # Test Logs
│       └── test-logs.txt       # Test execution logs
│
├── .env.example                 # Environment variables template
├── playwright.config.js         # Playwright configuration
└── package.json                 # Project dependencies

```

---

## 🗂️ Folder Descriptions & Functionality

### **1. `src/pages/` - Page Object Models**

**Purpose:** Encapsulates page interactions and element selectors following the Page Object Model (POM) pattern.

**Components:**

- **BasePage.js**
  - Base class inherited by all page objects
  - Contains common methods: `click()`, `fill()`, `getText()`, `waitForElement()`, etc.
  - Provides abstraction layer between tests and page elements
  - Promotes code reusability

- **LoginPage.js**
  - Extends BasePage
  - Contains login-specific actions: `login()`, `getErrorMessage()`, etc.
  - Manages login page selectors and interactions
  - Example for creating new page objects

- **HomePage.js**
  - Extends BasePage
  - Contains home page-specific actions: `logout()`, `search()`, etc.
  - Manages navigation and user-related operations

**Why This Matters:**
- Separates test logic from page interactions
- Makes tests more maintainable
- Easy to update selectors in one place
- Improves readability

---

### **2. `src/fixtures/` - Custom Playwright Fixtures**

**Purpose:** Provides reusable setup and teardown logic for tests using Playwright's fixture system.

**Components:**

- **fixtures.js**
  - Custom fixtures: `loginPage`, `homePage`, `authenticatedPage`, `apiContext`, `testData`, `logger`
  - Setup/teardown logic for each fixture
  - Automatic login before authenticated tests
  - API context with default headers

**Key Fixtures:**

| Fixture | Purpose |
|---------|---------|
| `loginPage` | Provides LoginPage instance |
| `homePage` | Provides HomePage instance |
| `authenticatedPage` | Auto-logs user in before test |
| `apiContext` | API testing context with headers |
| `testData` | Test data objects |
| `logger` | Logging functionality |

**Why This Matters:**
- Reduces code duplication
- Automatic setup/teardown
- Centralized test data management
- Better test organization

---

### **3. `src/utils/` - Utility Functions**

**Purpose:** Provides helper functions for common operations across tests.

**Components:**

- **testUtils.js**
  - `delay()` - Wait for specific duration
  - `retryWithBackoff()` - Retry with exponential backoff
  - `generateRandomString()` - Generate random test data
  - `generateRandomEmail()` - Create unique test emails
  - `getEnvVariable()` - Read environment variables
  - `deepEqual()` - Compare objects
  - `filterData()` - Filter arrays

- **apiHelper.js**
  - `getRequest()` - Make GET requests
  - `postRequest()` - Make POST requests
  - `putRequest()`, `deleteRequest()`, `patchRequest()`
  - `getResponseJSON()` - Parse response
  - `checkResponseStatus()` - Verify HTTP status
  - `checkResponseHeader()` - Verify headers

**Why This Matters:**
- DRY (Don't Repeat Yourself) principle
- Centralized helper functions
- Easy to maintain and update
- Reusable across all tests

---

### **4. `src/data/` - Test Data**

**Purpose:** Centralized management of all test data used across tests.

**Components:**

- **testData.js**
  - User credentials (valid, invalid, empty)
  - Product information
  - Application URLs
  - Expected messages
  - Test case metadata

**Benefits:**
- Single source of truth for test data
- Easy to update for different environments
- Reduces hardcoded values in tests
- Supports data-driven testing

---

### **5. `src/config/` - Configuration Management**

**Purpose:** Manages environment-specific configurations and settings.

**Components:**

- **config.js**
  - Environment selection (dev, staging, production)
  - Browser settings (headless, slowMo, timeout)
  - API configuration
  - Logging settings
  - Screenshot/Video options
  - Report settings
  - Functions: `getBaseURL()`, `getConfig()`, `setConfig()`

**Configuration Options:**
- Browser: headless, slow motion, timeout
- URLs: dev, staging, production
- Timeouts: navigation, action, assertion, API
- Logging: level, path
- Reports: format, path
- Retry: count, delay

**Why This Matters:**
- Centralizes all configurations
- Easy environment switching
- Reduces hardcoded values
- Supports CI/CD integration

---

### **6. `tests/ui/` - UI/Component Tests**

**Purpose:** Tests user interface and component functionality.

**Components:**

- **loginTest.spec.js** (Example)
  - Test login with valid/invalid credentials
  - Test error messages
  - Test button states
  - Test form validation
  - Test field masking

**Test Organization:**
```javascript
test.describe('Login Page Tests', () => {
  test('TC_001 - Description', async ({ loginPage, page }) => {
    // Arrange
    // Act
    // Assert
  });
});
```

**Best Practices:**
- Use descriptive test names
- Follow Arrange-Act-Assert pattern
- One assertion per test
- Use fixtures for setup

---

### **7. `tests/api/` - API Tests**

**Purpose:** Tests REST API endpoints and responses.

**Components:**

- **apiTests.spec.js** (Example)
  - Test GET endpoints
  - Test POST/PUT/DELETE operations
  - Test error handling
  - Test response validation
  - Test authentication

**Example API Test:**
```javascript
test('Get users list', async ({ apiContext }) => {
  const response = await getRequest(apiContext, '/users');
  expect(response.status()).toBe(200);
});
```

**Why This Matters:**
- Tests API layer independently
- Faster than UI tests
- Better error detection
- Supports parallel execution

---

### **8. `tests/e2e/` - End-to-End Tests**

**Purpose:** Tests complete user workflows and business processes.

**Components:**

- **completeUserJourney.spec.js** (Example)
  - Login → Browse → Add to Cart → Checkout
  - Profile updates
  - Complex user scenarios

**E2E Test Structure:**
```javascript
// Step 1: Navigate to login
// Step 2: Login with credentials
// Step 3: Verify logged in
// Step 4: Perform business flow
// Step 5: Verify outcome
```

**When to Use E2E:**
- Critical user paths
- Multi-step workflows
- Integration testing
- System-level validation

---

### **9. `tests/smoke/` - Smoke Tests**

**Purpose:** Quick sanity checks to verify basic functionality.

**Components:**

- **smokeTests.spec.js** (Example)
  - Application loads
  - Login page accessible
  - Basic navigation works
  - API endpoints responsive
  - Database connectivity

**Smoke Test Characteristics:**
- Quick execution
- Basic functionality checks
- Run frequently (CI/CD)
- Fail fast on critical issues

---

### **10. `reports/` - Test Reports**

**Purpose:** Contains generated test reports.

**Generated Files:**
- `index.html` - Main HTML report
- `data/` - Report metadata and results
- JSON format for parsing

**Report Contains:**
- Test execution summary
- Pass/Fail statistics
- Screenshots on failure
- Video recordings
- Test duration

---

### **11. `logs/` - Test Logs**

**Purpose:** Stores detailed test execution logs.

**Log Levels:**
- DEBUG: Detailed debugging information
- INFO: General information
- WARN: Warning messages
- ERROR: Error messages

**Log Usage:**
- Debugging failed tests
- Performance analysis
- Audit trail
- CI/CD integration

---

### **12. `.env.example` & `.env` - Environment Variables**

**Purpose:** Manages environment-specific configurations.

**Template:** `.env.example`
**Actual:** `.env` (not committed to git)

**Variables:**
```
ENV=dev
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000/api
HEADLESS=true
LOG_LEVEL=info
RETRY_COUNT=0
```

---

## 🔄 How Components Work Together

### **Test Execution Flow:**

```
Test File (e.g., loginTest.spec.js)
    ↓
Uses Fixtures (fixtures.js)
    ↓
Instantiates Page Objects (LoginPage extends BasePage)
    ↓
Uses Page Object Methods (login(), fill(), click())
    ↓
Leverages Utilities (testUtils.js, apiHelper.js)
    ↓
Accesses Test Data (testData.js)
    ↓
Uses Configuration (config.js, .env)
    ↓
Generates Reports & Logs (reports/, logs/)
```

### **Key Interactions:**

1. **Test → Fixtures**: Tests use fixtures for setup/data
2. **Fixtures → Page Objects**: Fixtures instantiate page objects
3. **Page Objects → BasePage**: Page objects inherit common methods
4. **Tests → Utilities**: Tests use helper functions
5. **Tests → Data**: Tests read centralized test data
6. **All → Configuration**: All components read from config

---

## 🚀 Usage Examples

### **Running Specific Tests:**

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test loginTest.spec.js

# Run specific test
npx playwright test loginTest.spec.js -g "TC_001"

# Run by tag
npx playwright test --grep @smoke

# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
```

### **Creating a New Test:**

```javascript
const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const testData = require('../../src/data/testData');

test.describe('Feature Name', () => {
  test('TC_NNN - Test description', async ({ loginPage, testData }) => {
    // Use fixtures and utilities
    await loginPage.navigateToLoginPage();
    // ... test steps
  });
});
```

### **Creating a New Page Object:**

```javascript
const BasePage = require('./BasePage');

class NewPage extends BasePage {
  // Define selectors
  element = '#selector';
  
  // Define actions
  async doSomething() {
    await this.click(this.element);
  }
}

module.exports = NewPage;
```

---

## 🎯 Best Practices

1. **One Responsibility**: Each file has a single purpose
2. **DRY Principle**: No code duplication
3. **Maintainability**: Easy to update and extend
4. **Reusability**: Share code across tests
5. **Scalability**: Easy to add new tests
6. **Clarity**: Clear naming and organization
7. **Documentation**: Self-documenting code
8. **CI/CD Ready**: Works in pipelines

---

## 📊 Test Organization Strategy

| Test Type | Purpose | Speed | Coverage | Frequency |
|-----------|---------|-------|----------|-----------|
| **Unit** | Single function | ⚡⚡⚡ | Low | Always |
| **Smoke** | Basic functionality | ⚡⚡ | Medium | Every commit |
| **API** | Endpoint testing | ⚡⚡ | High | Frequently |
| **UI** | Component interaction | ⚡ | Medium | Daily |
| **E2E** | Full workflows | Low | High | Daily/Weekly |

---

## 🔧 Configuration Examples

### **Development Environment**
```
ENV=dev
BASE_URL=http://localhost:3000
HEADLESS=false
LOG_LEVEL=debug
```

### **CI/CD Pipeline**
```
ENV=staging
HEADLESS=true
RECORD_VIDEO=true
RETRY_COUNT=1
PARALLEL_WORKERS=4
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

**Framework Version:** 1.0.0  
**Last Updated:** 2024  
**Maintained By:** QA Team
