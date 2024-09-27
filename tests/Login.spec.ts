import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';

test.describe('Login to Bank', () => {
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;
    const expectedUserName = LoginData.CorrectLogin.Message;

    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(userName, userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Failed login with wrong login', async ({ page }) => {
    // Arrange
    const incorrectuserName = LoginData.ShortLogin.userName;
    const userPassword = LoginData.ShortLogin.userPassword;
    const expectedErrorMessage = LoginData.ShortLogin.Message;

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
    const userName = LoginData.ShortPassword.userName;
    const incorrectPassword = LoginData.ShortPassword.userPassword;
    const expectedErrorMessage = LoginData.ShortPassword.Message;
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
