import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';

export function storeToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
}

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}
