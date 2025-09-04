import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test('should display pricing information', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check for pricing elements
    await expect(page.locator('text=/1,499|1499/').first()).toBeVisible();
    await expect(page.locator('text=/calculator/i')).toBeVisible();
  });

  test('should show all 27 hidden fees', async ({ page }) => {
    await page.goto('/pricing');
    
    // Look for the mention of 27 fees
    const hasFeesText = await page.locator('text=/27.*fee|27.*cost/i').isVisible();
    expect(hasFeesText).toBeTruthy();
  });

  test('should have payment button', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check for payment/purchase button
    const payButton = page.locator('button:has-text("Get Access"), button:has-text("Purchase"), button:has-text("Buy Now")').first();
    await expect(payButton).toBeVisible();
  });

  test('should display no refund policy', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check for refund policy mention
    const hasRefundPolicy = await page.locator('text=/refund|sales.*final/i').first().isVisible();
    expect(hasRefundPolicy).toBeTruthy();
  });
});