import { test, expect } from '@playwright/test';

test.describe('UI | Login | Page Load & Elements', () => {

  test('Login page loads successfully', async ({ page }) => {
    await page.goto('https://havanafortuna.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    await expect(page).toHaveURL(/havanafortuna/);
  });

  test('Login form elements are visible', async ({ page }) => {
    await page.goto('https://havanafortuna.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    // ⚠️ Adjust selectors if UI changes
    await expect(page.locator('input[type="text"], input[name="username"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

});
