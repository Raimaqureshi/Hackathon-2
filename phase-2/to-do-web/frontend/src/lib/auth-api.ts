import { API_CONFIG, ENDPOINTS } from '@/config/api';
import { requestWithRetry } from '@/utils/requestHandler';

type AuthPayload = {
  email: string;
  password: string;
};

export async function signup(data: AuthPayload) {
  const res = await requestWithRetry(`${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Signup failed' }));
    const errorMessage = errorData.detail || 'Signup failed';

    // Check if it's a rate limit error
    if (res.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export async function login(data: AuthPayload) {
  const res = await requestWithRetry(`${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Login failed' }));
    const errorMessage = errorData.detail || 'Login failed';

    // Check if it's a rate limit error
    if (res.status === 429) {
      throw new Error('Too many login attempts. Please try again later.');
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
