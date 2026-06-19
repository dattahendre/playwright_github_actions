/**
 * placeholderApiRefactored.spec.js - Refactored from api-test.spec.js
 * Using Modern Playwright Framework
 * 
 * BEFORE (Old Structure):
 * - Direct request object usage
 * - Repeated code for API calls
 * - No API helpers
 * - Hard-coded endpoints
 * 
 * AFTER (New Framework):
 * - Uses apiHelper utilities
 * - Centralized API helpers
 * - Better organization
 * - Reusable API functions
 * - Built-in logging
 */

const test = require('../../src/fixtures/fixtures');
const { expect } = require('@playwright/test');
const {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  checkResponseStatus,
  getResponseJSON,
  checkResponseHeader
} = require('../../src/utils/apiHelper');

test.describe('JSONPlaceholder API Tests - Refactored', () => {
  
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test.beforeEach(async ({ logger }) => {
    logger.info('API Test Suite started');
  });

  test('TC_API_001 - GET /posts returns 200 status code with valid data', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_001 - Basic GET request');
      const endpoint = '/posts/1';

      // Act
      logger.info(`Making GET request to ${baseURL}${endpoint}`);
      const response = await getRequest(apiContext, endpoint);

      // Assert
      logger.info('Verifying status code is 200');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying content-type header');
      const hasJsonHeader = checkResponseHeader(response, 'content-type', 'application/json; charset=utf-8');
      expect(hasJsonHeader).toBe(true);

      logger.info('Test passed');
    });

  test('TC_API_002 - GET /users/:id returns user data with all required fields', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_002 - Validate response body content');
      const endpoint = '/users/1';

      // Act
      logger.info(`Making GET request to ${endpoint}`);
      const response = await getRequest(apiContext, endpoint);
      const responseBody = await getResponseJSON(response);

      // Assert
      logger.info('Verifying status code');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying response contains required fields');
      expect(responseBody).toHaveProperty('id');
      expect(responseBody).toHaveProperty('name');
      expect(responseBody).toHaveProperty('email');
      expect(responseBody).toHaveProperty('phone');
      expect(responseBody).toHaveProperty('website');

      logger.info('Verifying field values');
      expect(responseBody.id).toBe(1);
      expect(responseBody.name).toBe('Leanne Graham');
      expect(responseBody.email).toBe('Sincere@april.biz');

      logger.info('Test passed');
    });

  test('TC_API_003 - GET /posts/:id returns post with correct structure', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_003 - Validate post structure');
      const endpoint = '/posts/1';

      // Act
      logger.info(`Fetching post from ${endpoint}`);
      const response = await getRequest(apiContext, endpoint);
      const post = await getResponseJSON(response);

      // Assert
      logger.info('Verifying response structure');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying post fields');
      expect(post.userId).toBe(1);
      expect(post.id).toBe(1);
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();

      logger.info('Verifying field types');
      expect(typeof post.title).toBe('string');
      expect(typeof post.body).toBe('string');
      expect(typeof post.userId).toBe('number');

      logger.info('Test passed - Post structure valid');
    });

  test('TC_API_004 - GET /posts?userId=1 returns array of posts', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_004 - Validate array response');
      const endpoint = '/posts?userId=1&_limit=5';

      // Act
      logger.info(`Fetching posts for userId=1`);
      const response = await getRequest(apiContext, endpoint);
      const posts = await getResponseJSON(response);

      // Assert
      logger.info('Verifying status code');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying response is array');
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);

      logger.info('Verifying array contains valid posts');
      posts.forEach(post => {
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('title');
        expect(post.userId).toBe(1);
      });

      logger.info(`Test passed - Found ${posts.length} posts`);
    });

  test('TC_API_005 - POST /posts creates new post', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_005 - Create new post');
      const newPost = {
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1
      };

      // Act
      logger.info('Creating new post with data:', newPost);
      const response = await postRequest(apiContext, '/posts', newPost);
      const createdPost = await getResponseJSON(response);

      // Assert
      logger.info('Verifying status code is 201');
      expect(checkResponseStatus(response, 201)).toBe(true);

      logger.info('Verifying post data');
      expect(createdPost.title).toBe(newPost.title);
      expect(createdPost.body).toBe(newPost.body);
      expect(createdPost.userId).toBe(newPost.userId);

      logger.info('Verifying post has ID');
      expect(createdPost.id).toBeDefined();
      expect(createdPost.id).toBeGreaterThan(0);

      logger.info('Test passed - Post created successfully');
    });

  test('TC_API_006 - PUT /posts/:id updates existing post', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_006 - Update existing post');
      const postId = 1;
      const updatedData = {
        id: postId,
        title: 'Updated Title',
        body: 'Updated body content',
        userId: 1
      };

      // Act
      logger.info(`Updating post ${postId}`);
      const response = await putRequest(apiContext, `/posts/${postId}`, updatedData);
      const updated = await getResponseJSON(response);

      // Assert
      logger.info('Verifying status code');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying updated data');
      expect(updated.id).toBe(postId);
      expect(updated.title).toBe(updatedData.title);
      expect(updated.body).toBe(updatedData.body);

      logger.info('Test passed - Post updated successfully');
    });

  test('TC_API_007 - DELETE /posts/:id deletes post', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_007 - Delete post');
      const postId = 1;

      // Act
      logger.info(`Deleting post ${postId}`);
      const response = await deleteRequest(apiContext, `/posts/${postId}`);

      // Assert
      logger.info('Verifying status code');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Test passed - Post deleted successfully');
    });

  test('TC_API_008 - GET /comments?postId=1 returns comments for post', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_008 - Get comments for post');
      const postId = 1;

      // Act
      logger.info(`Fetching comments for post ${postId}`);
      const response = await getRequest(apiContext, `/comments?postId=${postId}`);
      const comments = await getResponseJSON(response);

      // Assert
      logger.info('Verifying status code');
      expect(checkResponseStatus(response, 200)).toBe(true);

      logger.info('Verifying response is array');
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.length).toBeGreaterThan(0);

      logger.info('Verifying comment structure');
      comments.forEach(comment => {
        expect(comment).toHaveProperty('postId');
        expect(comment).toHaveProperty('id');
        expect(comment).toHaveProperty('name');
        expect(comment).toHaveProperty('email');
        expect(comment).toHaveProperty('body');
        expect(comment.postId).toBe(postId);
      });

      logger.info(`Test passed - Found ${comments.length} comments`);
    });

  test('TC_API_009 - Error handling for invalid endpoint', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_009 - Invalid endpoint error handling');

      // Act
      logger.info('Making request to non-existent endpoint');
      const response = await getRequest(apiContext, '/invalid-endpoint/999999');

      // Assert
      logger.info('Verifying status code is 404');
      expect(response.status()).toBe(404);

      logger.info('Test passed - 404 error returned as expected');
    });

  test('TC_API_010 - Response header validation', 
    async ({ apiContext, logger }) => {
      // Arrange
      logger.info('Test: TC_API_010 - Validate response headers');

      // Act
      logger.info('Making GET request');
      const response = await getRequest(apiContext, '/posts/1');

      // Assert
      logger.info('Verifying essential headers');
      const headers = response.headers();
      
      expect(headers).toHaveProperty('content-type');
      expect(headers['content-type']).toContain('application/json');
      
      expect(headers).toHaveProperty('server');
      expect(headers).toHaveProperty('date');

      logger.info('Test passed - All headers present');
    });

  test.afterEach(async ({ logger }) => {
    logger.info('API test completed');
  });
});
