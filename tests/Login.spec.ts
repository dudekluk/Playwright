import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';

test.describe('Login to Bank', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = 'JanKowal';
    const userPassword = 'JanKowal1234';
    const expectedUserName = 'Jan Demobankowy';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(userName, userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Failed login with wrong login', async ({ page }) => {
    // Arrange
    const incorrectuserName = 'tester';
    const userPassword = 'JanKowal1234';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);
    // Act
    await loginPage.login(incorrectuserName, userPassword);
    await loginPage.loginInput.click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Failed login with wrong password', async ({ page }) => {
    // Arrange
    const userName = 'ja';
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(userName, incorrectPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
