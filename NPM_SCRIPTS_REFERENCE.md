# NPM Scripts Reference

Add these scripts to your `package.json` for easy test execution:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test tests/ui/",
    "test:api": "playwright test tests/api/",
    "test:e2e": "playwright test tests/e2e/",
    "test:smoke": "playwright test tests/smoke/",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:codegen": "playwright codegen",
    "test:trace": "playwright show-trace",
    "test:ui-mode": "playwright test --ui",
    "test:parallel": "playwright test --workers=4",
    "test:serial": "playwright test --workers=1",
    "test:tag": "playwright test --grep @smoke",
    "install:browsers": "playwright install",
    "clean:reports": "rm -rf reports/",
    "clean:screenshots": "rm -rf screenshots/",
    "clean:videos": "rm -rf videos/",
    "clean:all": "npm run clean:reports && npm run clean:screenshots && npm run clean:videos",
    "lint": "eslint tests/",
    "format": "prettier --write \"tests/**/*.js\""
  }
}
```

## Script Descriptions

| Script | Purpose |
|--------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run UI tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:e2e` | Run E2E tests only |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Debug mode with inspector |
| `npm run test:report` | View HTML test report |
| `npm run test:codegen` | Record test automation |
| `npm run test:trace` | View test trace files |
| `npm run test:ui-mode` | Interactive UI mode |
| `npm run test:parallel` | Run with 4 workers |
| `npm run test:serial` | Run tests sequentially |
| `npm run test:tag` | Run tests with specific tag |
| `npm run install:browsers` | Install Playwright browsers |
| `npm run clean:reports` | Remove test reports |
| `npm run clean:screenshots` | Remove screenshot files |
| `npm run clean:videos` | Remove video recordings |
| `npm run clean:all` | Clean all artifacts |
| `npm run lint` | Lint test files |
| `npm run format` | Format code |

## Usage Examples

```bash
# Run all tests
npm test

# Run tests in specific category
npm run test:ui
npm run test:api
npm run test:smoke

# Run with specific configuration
npm run test:headed      # See browser
npm run test:debug       # Debug mode
npm run test:parallel    # 4 parallel workers
npm run test:serial      # Sequential execution

# Run specific test by tag
npm run test:tag

# Generate test code
npm run test:codegen

# View reports and traces
npm run test:report
npm run test:trace

# Clean up files
npm run clean:all

# Code quality
npm run lint
npm run format
```

## CI/CD Integration Example

```yaml
# .github/workflows/tests.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run install:browsers
      - run: npm run test:smoke
      - run: npm run test:api
      - run: npm run test:ui
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: reports
          path: reports/
```
