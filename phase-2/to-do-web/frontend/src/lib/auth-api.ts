const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://raima-123-qureshi-to-do-fullstack.hf.space';

type AuthPayload = {
  email: string;
  password: string;
};

export async function signup(data: AuthPayload) {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Signup failed');
  }

  return res.json();
}

export async function login(data: AuthPayload) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Login failed');
  }

  return res.json();
}
