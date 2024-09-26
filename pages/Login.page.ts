import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  

  async login(userLogin: string, userPassword: string) {
    await this.loginInput.fill(userLogin);
    await this.passwordInput.fill(userPassword);
  }
}
