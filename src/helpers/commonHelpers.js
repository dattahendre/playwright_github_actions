/**
 * commonHelpers.js - Common helper functions
 * Reusable helpers for common testing scenarios
 */

/**
 * Wait for element and verify it's visible
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<void>}
 */
async function waitAndVerifyElementVisible(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    const isVisible = await page.isVisible(selector);
    if (!isVisible) {
      throw new Error(`Element ${selector} is not visible`);
    }
  } catch (error) {
    throw new Error(`Element ${selector} not found or visible: ${error.message}`);
  }
}

/**
 * Fill form field and verify input
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {string} value - Value to enter
 * @returns {Promise<void>}
 */
async function fillAndVerify(page, selector, value) {
  await page.fill(selector, value);
  const inputValue = await page.inputValue(selector);
  if (inputValue !== value) {
    throw new Error(`Input value mismatch. Expected: ${value}, Got: ${inputValue}`);
  }
}

/**
 * Click element and wait for navigation
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<void>}
 */
async function clickAndWaitForNavigation(page, selector) {
  await Promise.all([
    page.waitForNavigation(),
    page.click(selector)
  ]);
}

/**
 * Get all table rows data
 * @param {Page} page - Playwright page object
 * @param {string} tableSelector - Table CSS selector
 * @returns {Promise<Array>} Array of row data
 */
async function getTableData(page, tableSelector) {
  return await page.evaluate((selector) => {
    const rows = document.querySelectorAll(`${selector} tbody tr`);
    const data = [];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const rowData = Array.from(cells).map(cell => cell.textContent.trim());
      data.push(rowData);
    });
    return data;
  }, tableSelector);
}

/**
 * Upload file to file input
 * @param {Page} page - Playwright page object
 * @param {string} selector - File input selector
 * @param {string} filePath - Path to file
 * @returns {Promise<void>}
 */
async function uploadFile(page, selector, filePath) {
  const fileInput = await page.$(selector);
  await fileInput.setInputFiles(filePath);
}

/**
 * Select dropdown option by text
 * @param {Page} page - Playwright page object
 * @param {string} selector - Select element selector
 * @param {string} optionText - Option text to select
 * @returns {Promise<void>}
 */
async function selectDropdownByText(page, selector, optionText) {
  await page.click(selector);
  await page.click(`text=${optionText}`);
}

/**
 * Get all visible text on page
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} All visible text
 */
async function getAllVisibleText(page) {
  return await page.textContent('body');
}

/**
 * Check if element is enabled
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<boolean>} True if enabled
 */
async function isElementEnabled(page, selector) {
  const isDisabled = await page.getAttribute(selector, 'disabled');
  return isDisabled === null;
}

/**
 * Get all attribute values from elements
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {string} attribute - Attribute name
 * @returns {Promise<Array>} Array of attribute values
 */
async function getAllAttributeValues(page, selector, attribute) {
  return await page.evaluate(
    ({ selector, attribute }) => {
      const elements = document.querySelectorAll(selector);
      return Array.from(elements).map(el => el.getAttribute(attribute));
    },
    { selector, attribute }
  );
}

/**
 * Execute script and get result
 * @param {Page} page - Playwright page object
 * @param {string} script - JavaScript to execute
 * @param {any} arg - Optional argument
 * @returns {Promise<any>} Script result
 */
async function executeScript(page, script, arg = null) {
  if (arg) {
    return await page.evaluate((arg) => {
      // Script will be injected here
      return eval(`(${script})`)(arg);
    }, arg);
  }
  return await page.evaluate(script);
}

/**
 * Wait for function to return true
 * @param {Function} fn - Function to wait for
 * @param {number} maxWait - Maximum wait time in ms
 * @param {number} interval - Check interval in ms
 * @returns {Promise<void>}
 */
async function waitForCondition(fn, maxWait = 5000, interval = 100) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWait) {
    if (await fn()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error(`Condition not met within ${maxWait}ms`);
}

module.exports = {
  waitAndVerifyElementVisible,
  fillAndVerify,
  clickAndWaitForNavigation,
  getTableData,
  uploadFile,
  selectDropdownByText,
  getAllVisibleText,
  isElementEnabled,
  getAllAttributeValues,
  executeScript,
  waitForCondition
};
