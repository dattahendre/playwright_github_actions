const { test, expect } = require('@playwright/test');

test.describe('API GET Request Tests', () => {
  // Test 1: Basic GET request with status code validation
  test('should return 200 status code for valid GET request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Validate status code
    expect(response.status()).toBe(200);
    
    // Validate response headers
    expect(response.headers()['content-type']).toContain('application/json');
  });

  // Test 2: GET request with response body validation
  test('should validate response body content', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    
    // Validate specific fields in response
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('email');
    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBe('Leanne Graham');
  });

  // Test 3: GET request with multiple assertions on response
  test('should validate multiple fields in API response', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    
    // Validate response structure
    expect(post.userId).toBe(1);
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
    expect(typeof post.title).toBe('string');
  });

  // Test 4: GET request with array response validation
  test('should validate array response from API', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5');
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    
    // Validate it's an array
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBeLessThanOrEqual(5);
    
    // Validate first item structure
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  // Test 5: GET request with query parameters
  test('should validate GET request with query parameters', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        postId: 1,
        _limit: 3
      }
    });
    
    expect(response.status()).toBe(200);
    
    const comments = await response.json();
    
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(3);
    
    // Validate all comments belong to postId 1
    comments.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
  });

  // Test 6: GET request error handling
  test('should return 404 for non-existent resource', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999999');
    
    expect(response.status()).toBe(404);
  });

  // Test 7: GET request with response time validation
  test('should validate API response time', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    // Validate response time is less than 5 seconds
    expect(responseTime).toBeLessThan(5000);
  });

  // Test 8: GET request with custom headers
  test('should accept custom headers in GET request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Playwright-Test'
      }
    });
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toBeTruthy();
  });

  // Test 9: GET request response header validation
  test('should validate response headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const headers = response.headers();
    
    // Validate important headers
    expect(headers['content-type']).toContain('application/json');
    expect(headers).toHaveProperty('date');
    expect(headers).toHaveProperty('server');
  });

  // Test 10: GET request with data validation using regex
  test('should validate response data using regex patterns', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(user.email).toMatch(emailRegex);
    
    // Validate name is not empty
    expect(user.name.length).toBeGreaterThan(0);
  });
});
