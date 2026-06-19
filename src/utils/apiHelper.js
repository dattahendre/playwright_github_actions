/**
 * apiHelper.js - Helper functions for API testing
 * Provides common API operations and assertions
 */

/**
 * Make GET request
 * @param {APIRequestContext} context - API context
 * @param {string} endpoint - API endpoint
 * @returns {Promise<APIResponse>} Response object
 */
async function getRequest(context, endpoint) {
  return await context.get(endpoint);
}

/**
 * Make POST request
 * @param {APIRequestContext} context - API context
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<APIResponse>} Response object
 */
async function postRequest(context, endpoint, data) {
  return await context.post(endpoint, { data });
}

/**
 * Make PUT request
 * @param {APIRequestContext} context - API context
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<APIResponse>} Response object
 */
async function putRequest(context, endpoint, data) {
  return await context.put(endpoint, { data });
}

/**
 * Make DELETE request
 * @param {APIRequestContext} context - API context
 * @param {string} endpoint - API endpoint
 * @returns {Promise<APIResponse>} Response object
 */
async function deleteRequest(context, endpoint) {
  return await context.delete(endpoint);
}

/**
 * Make PATCH request
 * @param {APIRequestContext} context - API context
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<APIResponse>} Response object
 */
async function patchRequest(context, endpoint, data) {
  return await context.patch(endpoint, { data });
}

/**
 * Get response JSON
 * @param {APIResponse} response - Response object
 * @returns {Promise<object>} Parsed JSON
 */
async function getResponseJSON(response) {
  return await response.json();
}

/**
 * Get response text
 * @param {APIResponse} response - Response object
 * @returns {Promise<string>} Response text
 */
async function getResponseText(response) {
  return await response.text();
}

/**
 * Check response status
 * @param {APIResponse} response - Response object
 * @param {number} expectedStatus - Expected status code
 * @returns {boolean} True if status matches
 */
function checkResponseStatus(response, expectedStatus) {
  return response.status() === expectedStatus;
}

/**
 * Check response header
 * @param {APIResponse} response - Response object
 * @param {string} headerName - Header name
 * @param {string} expectedValue - Expected header value
 * @returns {boolean} True if header matches
 */
function checkResponseHeader(response, headerName, expectedValue) {
  return response.headers()[headerName.toLowerCase()] === expectedValue;
}

/**
 * Check if response contains text
 * @param {string} responseText - Response text
 * @param {string} searchText - Text to search
 * @returns {boolean} True if text is found
 */
function checkResponseContainsText(responseText, searchText) {
  return responseText.includes(searchText);
}

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
  getResponseJSON,
  getResponseText,
  checkResponseStatus,
  checkResponseHeader,
  checkResponseContainsText
};
