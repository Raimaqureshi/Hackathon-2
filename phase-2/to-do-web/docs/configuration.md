# Configuration Guide

## Environment Variables

### Backend
- `DATABASE_URL`: Database connection string (defaults to SQLite if not set)
- `BETTER_AUTH_SECRET`: Secret key for JWT tokens (required for production)

### Frontend
- `NEXT_PUBLIC_API_URL`: Base URL for the backend API (defaults to production URL)

## API Configuration

The frontend includes a centralized configuration in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://raima-123-qureshi-to-do-web.hf.space',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT_DELAY: 1000, // 1 second delay before retry after rate limit
};
```

## Rate Limiting

Authentication endpoints are protected with rate limiting:
- Login endpoint: 5 requests per minute per IP address
- This helps prevent brute force attacks

## Error Handling

The application includes comprehensive error handling:
- Network timeouts
- Retry logic with exponential backoff
- Specific error messages for different HTTP status codes
- Rate limit handling

## Offline Support

The application includes a service worker for basic offline support:
- Caches static assets
- Allows users to view the UI even when offline
- API requests will fail gracefully when offline