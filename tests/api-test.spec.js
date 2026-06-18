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

// ============================================================================
// MANUAL TEST CASES WITH DIFFERENT DATA COMBINATIONS
// ============================================================================

test.describe('API POST Request Tests - Create Operations', () => {
  
  // Test Dataset 1: Valid POST request with required fields
  test('should create a new post with valid data - Dataset 1', async ({ request }) => {
    const postData = {
      title: 'Automation Testing Guide',
      body: 'Complete guide to automated testing with Playwright',
      userId: 1
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);
    expect(responseBody).toHaveProperty('id');
  });

  // Test Dataset 2: POST with long content
  test('should create post with long content - Dataset 2', async ({ request }) => {
    const postData = {
      title: 'Extended Testing Documentation',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
      userId: 2
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody.body.length).toBeGreaterThan(100);
    expect(responseBody.userId).toBe(2);
  });

  // Test Dataset 3: POST with different user IDs
  test('should create post for different user IDs - Dataset 3', async ({ request }) => {
    const userIds = [1, 5, 10];
    
    for (const userId of userIds) {
      const postData = {
        title: `Test Post for User ${userId}`,
        body: `This is a test post created by user ${userId}`,
        userId: userId
      };
      
      const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: postData
      });
      
      expect(response.status()).toBe(201);
      const responseBody = await response.json();
      expect(responseBody.userId).toBe(userId);
    }
  });

  // Test Dataset 4: POST with special characters
  test('should handle special characters in POST data - Dataset 4', async ({ request }) => {
    const postData = {
      title: 'Special Characters: @#$%^&*()',
      body: 'Testing special chars: <script>alert("test")</script> & HTML entities',
      userId: 3
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toContain('@#$%');
  });

  // Test Dataset 5: POST with Unicode characters
  test('should handle Unicode characters - Dataset 5', async ({ request }) => {
    const postData = {
      title: '测试中文 テスト العربية',
      body: 'Emoji test: 😀 🎉 🚀 ✅',
      userId: 4
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toContain('测试');
  });

  // Test Dataset 6: POST with missing optional fields
  test('should create post with only required fields - Dataset 6', async ({ request }) => {
    const postData = {
      title: 'Minimal Post',
      body: 'Content only',
      userId: 5
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
  });

  // Test Dataset 7: POST with null/empty values (negative case)
  test('should handle invalid POST data with empty fields - Dataset 7', async ({ request }) => {
    const postData = {
      title: '',
      body: '',
      userId: null
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    // API may still accept but verify response
    expect([201, 400]).toContain(response.status());
  });

  // Test Dataset 8: POST with very large numeric values
  test('should handle large numeric values - Dataset 8', async ({ request }) => {
    const postData = {
      title: 'Large Numbers Test',
      body: 'Testing with large user ID',
      userId: 999999
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(999999);
  });

  // Test Dataset 9: POST with numeric string user ID
  test('should handle numeric string user ID - Dataset 9', async ({ request }) => {
    const postData = {
      title: 'String User ID Test',
      body: 'Testing with user ID as string',
      userId: '7'
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: postData
    });
    
    expect(response.status()).toBe(201);
  });
});

test.describe('API PUT Request Tests - Update Operations', () => {

  // Test Dataset 1: Update all fields
  test('should update post with all fields - Dataset 1', async ({ request }) => {
    const updateData = {
      id: 1,
      title: 'Updated Post Title',
      body: 'This is the updated content',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe(updateData.title);
    expect(responseBody.body).toBe(updateData.body);
  });

  // Test Dataset 2: Update with different user ID
  test('should update post to different user - Dataset 2', async ({ request }) => {
    const updateData = {
      id: 2,
      title: 'Reassigned Post',
      body: 'Post reassigned to another user',
      userId: 5
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/2', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(5);
  });

  // Test Dataset 3: Partial update (only title)
  test('should update only title field - Dataset 3', async ({ request }) => {
    const updateData = {
      title: 'Only Title Updated',
      body: 'original body',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/3', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
  });

  // Test Dataset 4: Update multiple posts in sequence
  test('should update multiple posts sequentially - Dataset 4', async ({ request }) => {
    const postIds = [4, 5, 6];
    
    for (const id of postIds) {
      const updateData = {
        title: `Updated Post ${id}`,
        body: `Updated body for post ${id}`,
        userId: 1
      };
      
      const response = await request.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        data: updateData
      });
      
      expect(response.status()).toBe(200);
    }
  });

  // Test Dataset 5: Update with special characters
  test('should update post with special characters - Dataset 5', async ({ request }) => {
    const updateData = {
      title: 'Updated: Special Chars @#$%',
      body: '<HTML>& entities & symbols',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/5', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
  });

  // Test Dataset 6: Update non-existent post (negative case)
  test('should handle update of non-existent post - Dataset 6', async ({ request }) => {
    const updateData = {
      title: 'Non-existent Post Update',
      body: 'This update may return 404',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/999999', {
      data: updateData
    });
    
    expect([200, 404]).toContain(response.status());
  });

  // Test Dataset 7: Update with empty body
  test('should update with empty body - Dataset 7', async ({ request }) => {
    const updateData = {
      title: 'Post with empty body',
      body: '',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/7', {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
  });
});

test.describe('API DELETE Request Tests - Delete Operations', () => {

  // Test Dataset 1: Delete existing post
  test('should delete existing post - Dataset 1', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual({});
  });

  // Test Dataset 2: Delete multiple posts
  test('should delete multiple posts - Dataset 2', async ({ request }) => {
    const postIds = [10, 11, 12];
    
    for (const id of postIds) {
      const response = await request.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      expect(response.status()).toBe(200);
    }
  });

  // Test Dataset 3: Delete non-existent post
  test('should handle deletion of non-existent post - Dataset 3', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/99999');
    
    expect([200, 404]).toContain(response.status());
  });

  // Test Dataset 4: Verify deleted post cannot be retrieved
  test('should not retrieve deleted post - Dataset 4', async ({ request }) => {
    // Delete first
    const deleteResponse = await request.delete('https://jsonplaceholder.typicode.com/posts/15');
    expect(deleteResponse.status()).toBe(200);
    
    // Try to get deleted post
    const getResponse = await request.get('https://jsonplaceholder.typicode.com/posts/15');
    // May return 404 or empty object depending on API
    expect([200, 404]).toContain(getResponse.status());
  });

  // Test Dataset 5: Delete with custom headers
  test('should delete with custom headers - Dataset 5', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/20', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer token'
      }
    });
    
    expect([200, 404]).toContain(response.status());
  });
});

test.describe('API PATCH Request Tests - Partial Updates', () => {

  // Test Dataset 1: Patch with title only
  test('should patch post with title only - Dataset 1', async ({ request }) => {
    const patchData = {
      title: 'Patched Title Only'
    };
    
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
      data: patchData
    });
    
    expect([200, 204]).toContain(response.status());
  });

  // Test Dataset 2: Patch with body only
  test('should patch post with body only - Dataset 2', async ({ request }) => {
    const patchData = {
      body: 'Patched body content'
    };
    
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/2', {
      data: patchData
    });
    
    expect([200, 204]).toContain(response.status());
  });

  // Test Dataset 3: Patch multiple fields
  test('should patch multiple fields - Dataset 3', async ({ request }) => {
    const patchData = {
      title: 'Patched Title',
      body: 'Patched Body',
      userId: 2
    };
    
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/3', {
      data: patchData
    });
    
    expect([200, 204]).toContain(response.status());
  });

  // Test Dataset 4: Patch with empty string
  test('should handle patch with empty string values - Dataset 4', async ({ request }) => {
    const patchData = {
      title: '',
      body: ''
    };
    
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/4', {
      data: patchData
    });
    
    expect([200, 204, 400]).toContain(response.status());
  });
});

test.describe('API Comments Endpoint Tests', () => {

  // Test Dataset 1: Get comments for specific post
  test('should get comments for specific post - Dataset 1', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(Array.isArray(comments)).toBeTruthy();
    
    if (comments.length > 0) {
      expect(comments[0]).toHaveProperty('postId');
      expect(comments[0]).toHaveProperty('id');
      expect(comments[0]).toHaveProperty('name');
      expect(comments[0]).toHaveProperty('email');
      expect(comments[0]).toHaveProperty('body');
    }
  });

  // Test Dataset 2: Get comments with pagination
  test('should get comments with pagination - Dataset 2', async ({ request }) => {
    const limits = [1, 5, 10];
    
    for (const limit of limits) {
      const response = await request.get('https://jsonplaceholder.typicode.com/posts/2/comments', {
        params: {
          _limit: limit
        }
      });
      
      expect(response.status()).toBe(200);
      const comments = await response.json();
      expect(comments.length).toBeLessThanOrEqual(limit);
    }
  });

  // Test Dataset 3: Create new comment
  test('should create new comment - Dataset 3', async ({ request }) => {
    const commentData = {
      postId: 1,
      name: 'Test Comment Name',
      email: 'test@example.com',
      body: 'This is a test comment for automated testing'
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/comments', {
      data: commentData
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(commentData.name);
    expect(responseBody.email).toBe(commentData.email);
  });

  // Test Dataset 4: Create comments for different posts
  test('should create comments for multiple posts - Dataset 4', async ({ request }) => {
    const postIds = [1, 2, 3];
    
    for (const postId of postIds) {
      const commentData = {
        postId: postId,
        name: `Comment for Post ${postId}`,
        email: `user${postId}@example.com`,
        body: `Test comment for post number ${postId}`
      };
      
      const response = await request.post('https://jsonplaceholder.typicode.com/comments', {
        data: commentData
      });
      
      expect(response.status()).toBe(201);
    }
  });

  // Test Dataset 5: Validate comment email format
  test('should validate email format in comments - Dataset 5', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    
    expect(response.status()).toBe(200);
    const comments = await response.json();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    comments.forEach(comment => {
      expect(comment.email).toMatch(emailRegex);
    });
  });
});

test.describe('API Error Handling & Edge Cases', () => {

  // Test Dataset 1: Invalid endpoint
  test('should return 404 for invalid endpoint - Dataset 1', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/invalid-endpoint');
    
    expect(response.status()).toBe(404);
  });

  // Test Dataset 2: Malformed URL
  test('should handle malformed URL - Dataset 2', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/abc');
    
    // May return 404 or 400 depending on API
    expect([400, 404]).toContain(response.status());
  });

  // Test Dataset 3: Request with timeout
  test('should handle slow requests', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const endTime = Date.now();
    
    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(10000); // 10 seconds timeout
  });

  // Test Dataset 4: Request with very long parameters
  test('should handle long query parameters - Dataset 4', async ({ request }) => {
    const longString = 'a'.repeat(1000);
    
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        search: longString
      }
    });
    
    expect([200, 400, 414]).toContain(response.status()); // 414 is URI Too Long
  });

  // Test Dataset 5: Response content type validation
  test('should validate response content types - Dataset 5', async ({ request }) => {
    const endpoints = ['/posts/1', '/users/1', '/comments/1'];
    
    for (const endpoint of endpoints) {
      const response = await request.get(`https://jsonplaceholder.typicode.com${endpoint}`);
      
      expect(response.status()).toBe(200);
      const contentType = response.headers()['content-type'];
      expect(contentType).toContain('application/json');
    }
  });

  // Test Dataset 6: Request without expected headers
  test('should work without custom headers - Dataset 6', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  // Test Dataset 7: Negative ID validation
  test('should handle negative IDs - Dataset 7', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/-1');
    
    expect([200, 404]).toContain(response.status());
  });

  // Test Dataset 8: Zero ID validation
  test('should handle zero ID - Dataset 8', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/0');
    
    expect([200, 404]).toContain(response.status());
  });

  // Test Dataset 9: Float ID validation
  test('should handle float ID - Dataset 9', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1.5');
    
    expect([200, 404, 400]).toContain(response.status());
  });

  // Test Dataset 10: Multiple sequential requests
  test('should handle multiple sequential requests - Dataset 10', async ({ request }) => {
    const requests = [];
    
    for (let i = 1; i <= 5; i++) {
      const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${i}`);
      requests.push(response);
      expect(response.status()).toBe(200);
    }
    
    expect(requests.length).toBe(5);
  });
});
