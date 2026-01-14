// frontend/src/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://raima-123-qureshi-to-do-web.hf.space'),
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT_DELAY: 1000, // 1 second delay before retry after rate limit
};

export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
  },
  TASKS: {
    GET_ALL: '/api/tasks',
    CREATE: '/api/tasks',
    UPDATE: (id: string) => `/api/tasks/${id}`,
    DELETE: (id: string) => `/api/tasks/${id}`,
    TOGGLE_COMPLETE: (id: string) => `/api/tasks/${id}/complete`,
  },
};