import { Task } from '@/lib/types';
import { getToken } from './auth-client';
import { API_CONFIG, ENDPOINTS } from '@/config/api';
import { requestWithRetry } from '@/utils/requestHandler';

async function fetchWithAuth(url: string, options?: RequestInit) {
  const token = getToken();
  const headers = {
    ...options?.headers,
    'Content-Type': 'application/json',
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await requestWithRetry(url, { ...options, headers });

  if (!response.ok) {
    // Handle different status codes appropriately
    if (response.status === 401) {
      throw new Error('Not authenticated. Please log in again.');
    } else if (response.status === 403) {
      throw new Error('Access denied. You do not have permission to perform this action.');
    } else if (response.status === 404) {
      throw new Error('Resource not found.');
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else {
      const errorData = await response.json().catch(() => ({ detail: 'Something went wrong' }));
      throw new Error(errorData.detail || 'Something went wrong');
    }
  }

  return response;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS.GET_ALL}`);
  return response.json();
}

export async function createTask(description: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS.CREATE}`, {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
  return response.json();
}

export async function updateTask(id: string, description: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS.UPDATE(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ description }),
  });
  return response.json();
}

export async function toggleTaskCompletion(id: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS.TOGGLE_COMPLETE(id)}`, {
    method: 'PATCH',
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetchWithAuth(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS.DELETE(id)}`, {
    method: 'DELETE',
  });
}
