/**
 * config.js - Configuration management
 * Handles environment-specific configurations
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  // Environment
  environment: process.env.ENV || 'dev',
  
  // Browser configuration
  browser: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    timeout: 30000
  },

  // Application URLs
  urls: {
    dev: 'http://localhost:3000',
    staging: 'https://staging.example.com',
    production: 'https://example.com'
  },

  // API configuration
  api: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3
  },

  // Logging configuration
  logging: {
    enabled: true,
    level: process.env.LOG_LEVEL || 'info',
    logPath: './logs'
  },

  // Screenshot configuration
  screenshots: {
    onFailure: true,
    onSuccess: false,
    path: './screenshots'
  },

  // Video configuration
  video: {
    recordVideo: process.env.RECORD_VIDEO === 'true',
    path: './videos'
  },

  // Report configuration
  reporting: {
    enabled: true,
    type: process.env.REPORT_TYPE || 'html',
    path: './reports'
  },

  // Retry configuration
  retry: {
    count: parseInt(process.env.RETRY_COUNT) || 0,
    delay: 1000
  },

  // Timeout configuration
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 5000,
    api: 30000
  }
};

/**
 * Get base URL based on environment
 * @returns {string} Base URL
 */
function getBaseURL() {
  return config.urls[config.environment] || config.urls.dev;
}

/**
 * Get configuration value
 * @param {string} key - Configuration key (dot notation supported)
 * @returns {any} Configuration value
 */
function getConfig(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], config);
}

/**
 * Override configuration
 * @param {string} key - Configuration key
 * @param {any} value - Configuration value
 */
function setConfig(key, value) {
  const keys = key.split('.');
  let obj = config;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]]) {
      obj[keys[i]] = {};
    }
    obj = obj[keys[i]];
  }
  
  obj[keys[keys.length - 1]] = value;
}

module.exports = {
  config,
  getBaseURL,
  getConfig,
  setConfig
};
