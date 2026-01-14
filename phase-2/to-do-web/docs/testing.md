# Testing Guide

## Backend Tests

### Rate Limiting Test
To test the rate limiting functionality:

1. Make more than 5 login requests within a minute from the same IP
2. The 6th request should return a 429 status code
3. The response should include rate limit information

### Authentication Flow Test
1. Test signup with valid credentials
2. Test signup with duplicate email (should fail)
3. Test login with valid credentials (should succeed)
4. Test login with invalid credentials (should fail)
5. Test access to protected endpoints without token (should fail with 401)
6. Test access to protected endpoints with valid token (should succeed)

### Task Management Test
1. Create a new task (should succeed with valid token)
2. Get all tasks (should return created task)
3. Update a task (should succeed)
4. Toggle task completion (should update is_complete status)
5. Delete a task (should remove from list)
6. Try to access another user's task (should fail with 404)

## Frontend Tests

### Error Handling Test
1. Simulate network timeout - should show appropriate error message
2. Simulate rate limit - should show rate limit error message
3. Simulate 401 error - should redirect to login
4. Simulate 403 error - should show access denied message

### UI/UX Test
1. Test responsive design on different screen sizes
2. Test double-click to edit functionality
3. Test keyboard shortcuts (Enter to save, Esc to cancel)
4. Test toast notifications appear correctly
5. Test loading states during API calls

## Security Tests

### CORS Policy
1. Verify that only allowed origins can access the API
2. Verify that wildcard (*) is not in production CORS settings

### Authentication Security
1. Verify JWT tokens expire after 30 minutes
2. Verify that tokens are properly invalidated on logout
3. Verify that passwords are properly hashed

## Performance Tests

### Load Testing
1. Test concurrent API requests
2. Verify that the application handles high load appropriately
3. Check that database connections are properly managed under load