/**
 * playwright.config.js - Playwright Configuration
 * Centralized configuration for all test execution
 */

const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
require('dotenv').config();

module.exports = defineConfig({
  // Test execution settings
  testDir: path.join(__dirname, 'tests'),
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['list']
  ],

  // Shared settings for all projects
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  // Global timeout settings
  timeout: 30000,
  navigationTimeout: 30000,
  expect: {
    timeout: 5000
  },

  // Browser launch configuration
  webServer: {
    command: 'npm run server',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },

  // Projects configuration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Global setup and teardown
  globalSetup: undefined,
  globalTeardown: undefined,
});
