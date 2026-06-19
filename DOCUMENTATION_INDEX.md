# 📚 Documentation Index - Start Here!

Welcome to the Modern Playwright Framework! This index will help you navigate all documentation and find what you need.

---

## 🎯 Quick Navigation

### **I want to...**

| Goal | Document | Section |
|------|----------|---------|
| Get started quickly | [QUICK_START.md](./QUICK_START.md) | Setup Instructions |
| Understand the architecture | [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md) | Project Structure Overview |
| See folder descriptions | [README_STRUCTURE.md](./README_STRUCTURE.md) | Folder Functionality Matrix |
| View available commands | [NPM_SCRIPTS_REFERENCE.md](./NPM_SCRIPTS_REFERENCE.md) | Script Descriptions |
| Create a new test | [QUICK_START.md](./QUICK_START.md) | Create Your First Test |
| Debug a failing test | [QUICK_START.md](./QUICK_START.md) | Debugging Guide |
| Understand page objects | [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md) | src/pages/ Folder Description |
| Learn about fixtures | [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md) | src/fixtures/ Folder Description |
| See example tests | [QUICK_START.md](./QUICK_START.md) | Test Structure Template |
| Setup CI/CD | [NPM_SCRIPTS_REFERENCE.md](./NPM_SCRIPTS_REFERENCE.md) | CI/CD Integration Example |
| Review best practices | [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md) | Best Practices section |
| Get complete overview | [ARCHITECTURE_SUMMARY.md](./ARCHITECTURE_SUMMARY.md) | Complete summary |

---

## 📖 Documentation Files

### 1. **QUICK_START.md** ⚡
**Best For:** Getting up and running quickly  
**Time to Read:** 10 minutes  
**Contains:**
- Setup instructions
- First test walkthrough
- Common commands
- Troubleshooting
- Environment variables

**Start Here If:** You want to write your first test today

---

### 2. **FRAMEWORK_DOCUMENTATION.md** 📚
**Best For:** Understanding complete architecture  
**Time to Read:** 20+ minutes  
**Contains:**
- Complete project structure
- Detailed folder descriptions
- Component purposes
- Usage examples
- Test organization strategy
- Configuration guide
- Best practices

**Start Here If:** You want to understand everything in detail

---

### 3. **README_STRUCTURE.md** 🗺️
**Best For:** Visual understanding of structure  
**Time to Read:** 15 minutes  
**Contains:**
- ASCII project structure
- Folder functionality matrix
- Component relationships
- Visual diagrams
- Feature list

**Start Here If:** You're a visual learner

---

### 4. **NPM_SCRIPTS_REFERENCE.md** 🔧
**Best For:** Learning available commands  
**Time to Read:** 5 minutes  
**Contains:**
- All npm scripts
- Script descriptions
- Usage examples
- CI/CD integration
- Command table

**Start Here If:** You want to run tests quickly

---

### 5. **ARCHITECTURE_SUMMARY.md** 📋
**Best For:** High-level overview  
**Time to Read:** 10 minutes  
**Contains:**
- Architecture overview
- Component descriptions
- Quick reference
- Statistics
- Next steps

**Start Here If:** You need a complete but concise summary

---

## 🗂️ Folder Guide

### Core Framework (src/)

**src/pages/** - Page Object Models
- Contains: `BasePage.js`, `LoginPage.js`, `HomePage.js`
- Purpose: Encapsulate UI elements and interactions
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#1-srcpages--page-object-models)

**src/fixtures/** - Custom Fixtures
- Contains: `fixtures.js`
- Purpose: Reusable setup/teardown and test data
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#2-srcfixtures--custom-playwright-fixtures)

**src/utils/** - Utility Functions
- Contains: `testUtils.js`, `apiHelper.js`
- Purpose: Reusable helper functions
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#3-srcutils--utility-functions)

**src/data/** - Test Data
- Contains: `testData.js`
- Purpose: Centralized test data management
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#4-srcdata--test-data)

**src/config/** - Configuration
- Contains: `config.js`
- Purpose: Environment-specific settings
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#5-srcconfig--configuration-management)

**src/helpers/** - Helper Functions
- Contains: `commonHelpers.js`
- Purpose: Common testing operations
- Read: [README_STRUCTURE.md](./README_STRUCTURE.md#6️⃣-helpers--helper-functions)

---

### Test Suites (tests/)

**tests/ui/** - UI Component Tests
- Purpose: Test user interface
- Example: `loginTest.spec.js`
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#6-testsui--ui-component-tests)

**tests/api/** - API Tests
- Purpose: Test REST API endpoints
- Example: `apiTests.spec.js`
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#7-testsapi--api-tests)

**tests/e2e/** - End-to-End Tests
- Purpose: Test complete workflows
- Example: `completeUserJourney.spec.js`
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#8-testse2e--end-to-end-tests)

**tests/smoke/** - Smoke Tests
- Purpose: Quick sanity checks
- Example: `smokeTests.spec.js`
- Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#9-testssmoke--smoke-tests)

---

## 🚀 Learning Paths

### Path 1: Quick Start (30 minutes)
1. Read: [QUICK_START.md](./QUICK_START.md) - Setup (5 min)
2. Setup environment (.env configuration)
3. Create first page object (5 min)
4. Write first test (10 min)
5. Run test (5 min)
6. View report (5 min)

### Path 2: Complete Understanding (2 hours)
1. Read: [README_STRUCTURE.md](./README_STRUCTURE.md) (15 min)
2. Read: [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md) (45 min)
3. Review: Example tests in `tests/` (15 min)
4. Review: Page objects in `src/pages/` (15 min)
5. Review: Fixtures in `src/fixtures/` (15 min)
6. Practice: Create custom page object (15 min)

### Path 3: Framework Customization (3 hours)
1. Review: [ARCHITECTURE_SUMMARY.md](./ARCHITECTURE_SUMMARY.md) (15 min)
2. Create: New page objects for your app (45 min)
3. Update: Test data in `src/data/` (30 min)
4. Create: Custom fixtures as needed (30 min)
5. Write: Tests for your features (60 min)

---

## 📋 Checklist for Setup

- [ ] Read [QUICK_START.md](./QUICK_START.md)
- [ ] Copy `.env.example` to `.env`
- [ ] Update `.env` with your URLs
- [ ] Run `npm install`
- [ ] Run `npm run install:browsers`
- [ ] Create your page objects
- [ ] Write your first test
- [ ] Run `npm test`
- [ ] View reports with `npm run test:report`

---

## 🎯 Common Tasks

### Create a New Page Object
```javascript
// File: src/pages/ProductPage.js
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  productTitle = '.product-title';
  
  async navigateToProduct(id) {
    await this.goto(`/product/${id}`);
  }
}
```
See: [FRAMEWORK_DOCUMENTATION.md - Creating a New Page Object](./FRAMEWORK_DOCUMENTATION.md#creating-a-new-page-object)

### Create a New Test
```javascript
// File: tests/ui/productTest.spec.js
const test = require('../../src/fixtures/fixtures');

test('User can view product', async ({ page, loginPage }) => {
  // Test code here
});
```
See: [QUICK_START.md - Create Your First Test](./QUICK_START.md#step-2-create-test)

### Add Test Data
```javascript
// File: src/data/testData.js
testData.products.newProduct = {
  id: 'NEW_001',
  name: 'New Product',
  price: 99.99
};
```
See: [FRAMEWORK_DOCUMENTATION.md - Test Data](./FRAMEWORK_DOCUMENTATION.md#4-srcdata--test-data)

### Run Tests
```bash
npm test              # All tests
npm run test:ui       # UI tests only
npm run test:smoke    # Smoke tests only
npm run test:debug    # Debug mode
```
See: [NPM_SCRIPTS_REFERENCE.md](./NPM_SCRIPTS_REFERENCE.md)

---

## 🔍 Finding Information

### By Component
- **Page Objects** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#1-srcpages--page-object-models)
- **Fixtures** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#2-srcfixtures--custom-playwright-fixtures)
- **Utilities** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#3-srcutils--utility-functions)
- **Test Data** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#4-srcdata--test-data)
- **Configuration** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#5-srcconfig--configuration-management)

### By Test Type
- **UI Tests** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#6-testsui--ui-component-tests)
- **API Tests** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#7-testsapi--api-tests)
- **E2E Tests** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#8-testse2e--end-to-end-tests)
- **Smoke Tests** → [FRAMEWORK_DOCUMENTATION.md](./FRAMEWORK_DOCUMENTATION.md#9-testssmoke--smoke-tests)

### By Task
- **Setup** → [QUICK_START.md](./QUICK_START.md#setup-instructions)
- **Debugging** → [QUICK_START.md](./QUICK_START.md#debugging-guide)
- **Commands** → [NPM_SCRIPTS_REFERENCE.md](./NPM_SCRIPTS_REFERENCE.md)
- **Troubleshooting** → [QUICK_START.md](./QUICK_START.md#troubleshooting)

---

## 🎓 Learning Resources

### Official Documentation
- [Playwright Official Docs](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Debugging](https://playwright.dev/docs/debug)
- [Playwright CI Integration](https://playwright.dev/docs/ci)

### Our Framework
- [Complete Architecture](./FRAMEWORK_DOCUMENTATION.md)
- [Visual Structure](./README_STRUCTURE.md)
- [Quick Reference](./ARCHITECTURE_SUMMARY.md)

---

## 💡 Tips & Tricks

### Run Specific Test
```bash
npx playwright test loginTest.spec.js -g "TC_001"
```
See: [QUICK_START.md](./QUICK_START.md#common-commands)

### Debug Single Test
```bash
npx playwright test loginTest.spec.js --debug
```

### View Test Report
```bash
npm run test:report
```

### Generate Test Code
```bash
npm run test:codegen
```

---

## 📊 What's Included

✅ 13 folders with organized structure  
✅ 3+ page objects (extensible)  
✅ 6 custom fixtures  
✅ 17 utility functions  
✅ 11 helper functions  
✅ 18+ example test cases  
✅ 4 comprehensive documentation files  
✅ Modern Playwright configuration  
✅ Environment management  
✅ CI/CD ready setup  

---

## 🎯 Next Steps

1. **Start with Quick Start**
   ```
   Read: QUICK_START.md (10 min)
   ```

2. **Setup Your Environment**
   ```bash
   cp .env.example .env
   npm install
   npm run install:browsers
   ```

3. **Review the Examples**
   - Look at `src/pages/LoginPage.js`
   - Look at `tests/ui/loginTest.spec.js`
   - Look at `src/fixtures/fixtures.js`

4. **Create Your First Test**
   - Create a page object for your page
   - Write a simple test
   - Run it: `npm test`

5. **Explore Advanced Features**
   - Custom fixtures in `src/fixtures/`
   - API testing in `tests/api/`
   - E2E workflows in `tests/e2e/`

---

## 📞 Need Help?

1. **Check Troubleshooting** → [QUICK_START.md - Troubleshooting](./QUICK_START.md#troubleshooting)
2. **Review Examples** → Look in `tests/` folders
3. **Check Playwright Docs** → [playwright.dev](https://playwright.dev)
4. **Review Best Practices** → [FRAMEWORK_DOCUMENTATION.md - Best Practices](./FRAMEWORK_DOCUMENTATION.md#best-practices)

---

## 📚 Document Relationships

```
START HERE
    ↓
QUICK_START.md (10 min)
    ↓
├─→ Setup & Run Tests
├─→ FRAMEWORK_DOCUMENTATION.md (detailed)
├─→ README_STRUCTURE.md (visual)
├─→ NPM_SCRIPTS_REFERENCE.md (commands)
└─→ ARCHITECTURE_SUMMARY.md (overview)
```

---

**Ready to get started?**
👉 [Go to QUICK_START.md](./QUICK_START.md)

**Framework Version:** 1.0.0  
**Last Updated:** 2024
