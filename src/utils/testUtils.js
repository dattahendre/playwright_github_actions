/**
 * testUtils.js - Common test utility functions
 * Helper functions for common test operations
 */

/**
 * Wait for a specific duration
 * @param {number} milliseconds - Duration to wait
 */
async function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delayMs - Initial delay in milliseconds
 * @returns {Promise<any>} Result of the function
 */
async function retryWithBackoff(fn, maxAttempts = 3, delayMs = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const waitTime = delayMs * Math.pow(2, attempt - 1);
        console.log(`Attempt ${attempt} failed. Retrying in ${waitTime}ms...`);
        await delay(waitTime);
      }
    }
  }
  
  throw lastError;
}

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 * @returns {string} Random email
 */
function generateRandomEmail() {
  return `testuser_${Date.now()}@example.com`;
}

/**
 * Parse environment variables
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not found
 * @returns {string} Environment variable value
 */
function getEnvVariable(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}

/**
 * Compare two objects
 * @param {object} obj1 - First object
 * @param {object} obj2 - Second object
 * @returns {boolean} True if objects are equal
 */
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Extract data from array based on criteria
 * @param {array} array - Array to filter
 * @param {Function} predicate - Filter function
 * @returns {array} Filtered array
 */
function filterData(array, predicate) {
  return array.filter(predicate);
}

module.exports = {
  delay,
  retryWithBackoff,
  generateRandomString,
  generateRandomEmail,
  getEnvVariable,
  deepEqual,
  filterData
};
