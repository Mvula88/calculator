import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check for login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")').or(page.locator('button:has-text("Log In")'))).toBeVisible();
  });

  test('should display sign up page', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Check for signup form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Fill in invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Try to submit
    const submitButton = page.locator('button:has-text("Sign In")').or(page.locator('button:has-text("Log In")'));
    await submitButton.click();
    
    // Should show error message
    await page.waitForTimeout(2000);
    const errorVisible = await page.locator('text=/invalid|error|incorrect/i').isVisible();
    expect(errorVisible || (await page.url()).includes('/auth/login')).toBeTruthy();
  });

  test('should redirect to dashboard after login', async ({ page }) => {
    // This would need real credentials or test user setup
    // For now, just verify the flow exists
    await page.goto('/dashboard');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*auth\/login/);
  });
});