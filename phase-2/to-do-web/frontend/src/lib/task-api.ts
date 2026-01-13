import { Task, UserCreate } from '@/lib/types';
import { getToken } from './auth-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

async function fetchWithAuth(url: string, options?: RequestInit) {
  const token = getToken();
  const headers = {
    ...options?.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Something went wrong');
  }

  return response;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetchWithAuth(`${API_URL}/api/tasks`);
  return response.json();
}

export async function createTask(description: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_URL}/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
  return response.json();
}

export async function updateTask(id: string, description: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ description }),
  });
  return response.json();
}

export async function toggleTaskCompletion(id: string): Promise<Task> {
  const response = await fetchWithAuth(`${API_URL}/api/tasks/${id}/complete`, {
    method: 'PATCH',
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
