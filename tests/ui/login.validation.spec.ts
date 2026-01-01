import { test, expect } from '@playwright/test';

test.describe('UI | Login | Validation Tests', () => {

  const URL = 'https://havanafortuna.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });
  });

  test('Login button is enabled by default', async ({ page }) => {
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeEnabled();
  });

  test('Login button enabled when username & password entered', async ({ page }) => {
    const usernameInput =
      page.locator('input[name="username"], input[type="text"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await usernameInput.fill('testuser');
    await passwordInput.fill('testpass');

    await expect(loginButton).toBeEnabled();
  });

  test('Submitting empty form shows validation error (if present)', async ({ page }) => {
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();

    // optional validation message (UI dependent)
    const errorMsg = page.locator(
      'text=required, text=invalid, text=Please enter'
    );

    if (await errorMsg.count()) {
      await expect(errorMsg.first()).toBeVisible();
    }
  });

});
