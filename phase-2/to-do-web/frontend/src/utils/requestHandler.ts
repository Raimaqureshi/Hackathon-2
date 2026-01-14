// frontend/src/utils/requestHandler.ts
import { API_CONFIG } from '@/config/api';

export interface RequestOptions extends RequestInit {
  retries?: number;
  timeout?: number;
}

export const requestWithRetry = async (
  url: string,
  options: RequestOptions = {}
): Promise<Response> => {
  const { retries = API_CONFIG.RETRY_ATTEMPTS, timeout = API_CONFIG.TIMEOUT, ...fetchOptions } = options;

  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    try {
      // Create a promise that rejects after the timeout
      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      });

      // Race the fetch request against the timeout
      const controller = new AbortController();
      const fetchPromise = fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      }).catch(err => {
        controller.abort();
        throw err;
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      // If we got a response and it's not a rate limit error, return it
      if (response.status !== 429) {
        return response;
      }

      // If it's a rate limit error, wait before retrying
      console.warn(`Rate limited. Waiting before retry ${i + 1}/${retries}`);
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RATE_LIMIT_DELAY));

    } catch (error) {
      lastError = error;

      // If this was the last attempt, throw the error
      if (i === retries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s, etc.
      console.warn(`Request failed, retrying in ${delay}ms... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};