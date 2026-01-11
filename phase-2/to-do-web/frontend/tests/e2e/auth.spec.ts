// frontend/tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow a user to sign up', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="email"]', 'e2e_test@example.com');
    await page.fill('input[name="password"]', 'E2eTestPassword123');
    await page.click('button[type="submit"]');
    // Expect to be redirected to login or dashboard
    await expect(page).toHaveURL('/login'); // or '/dashboard' based on implementation
  });

  test('should allow a user to log in and then log out', async ({ page }) => {
    // Assuming a user already exists or is signed up in a beforeEach hook
    // For this E2E test, we'll quickly sign up a new user first
    await page.goto('/signup');
    await page.fill('input[name="email"]', 'e2e_login@example.com');
    await page.fill('input[name="password"]', 'E2eLoginPassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/login');

    await page.goto('/login');
    await page.fill('input[name="email"]', 'e2e_login@example.com');
    await page.fill('input[name="password"]', 'E2eLoginPassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard'); // Expect to be on the dashboard after login

    // Logout
    await page.click('button[name="logout"]'); // Assuming a logout button with this name
    await expect(page).toHaveURL('/login');
  });

  test('should not allow access to protected routes when not logged in', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login'); // Expect to be redirected to login
  });
});
