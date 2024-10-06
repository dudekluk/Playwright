import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';

test.describe('Login to Bank', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await page.goto('/');
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;
    const expectedUserName = LoginData.CorrectLogin.Message;

    // Act
    await login.LoginUser(userName, userPassword);
    await login.elements.buttonLogin.click();

    // Assert
    await expect(login.messages.confirmUserName).toHaveText(expectedUserName);
  });

  test('Failed login with wrong login', async ({ page }) => {
    // Arrange
    const incorrectuserName = LoginData.ShortLogin.userName;
    const userPassword = LoginData.ShortLogin.userPassword;
    const expectedErrorMessage = LoginData.ShortLogin.Message;

    // Act
    await login.LoginUser(incorrectuserName, userPassword);

    // Assert
    await expect(login.messages.errorUserName).toHaveText(expectedErrorMessage);
  });

  test('Failed login with wrong password', async ({ page }) => {
    // Arrange
    const userName = LoginData.ShortPassword.userName;
    const incorrectPassword = LoginData.ShortPassword.userPassword;
    const expectedErrorMessage = LoginData.ShortPassword.Message;

    // Act
    await login.LoginUser(userName, incorrectPassword);
    await login.elements.login.click();

    // Assert
    await expect(login.messages.errorUserPassword).toHaveText(
      expectedErrorMessage,
    );
  });
});
