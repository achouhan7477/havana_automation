import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.skip('UI | User Login | Valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('internaluser', 'Aman@1234');

  // Wait for UI change
  await page.waitForTimeout(5000);

  // TEMP assertion (until we get exact locator)
  await expect(page).toHaveURL(/login/);
});
