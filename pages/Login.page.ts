import { Locator, Page } from '@playwright/test';

export class Login {
  private page: Page;
  public elements: Record<string, Locator>;
  public messages: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      loginInput: this.page.getByTestId('login-input'),
      passwordInput: this.page.getByTestId('password-input'),
      loginButton: this.page.getByTestId('login-button'),
    };
    this.messages = {
      successLogin: this.page.getByTestId('user-name'),
      errorLoginId: this.page.getByTestId('error-login-id'),
      errorLoginPassword: this.page.getByTestId('error-login-password'),
    };
  }

  async LoginUser(userLogin: string, userPassword: string) {
    await this.elements.loginInput.fill(userLogin);
    await this.elements.passwordInput.fill(userPassword);
  }

  async loginWithCredentials(username: string, password: string) {
    await this.LoginUser(username, password);
    await this.elements.loginButton.click();
  }
}
