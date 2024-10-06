import { Locator, Page } from '@playwright/test';

export class Login {
  private page: Page;
  public elements: Record<string, Locator>;
  public messages: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      login: this.page.getByTestId('login-input'),
      password: this.page.getByTestId('password-input'),
      buttonLogin: this.page.getByTestId('login-button'),
    };
    this.messages = {
      confirmUserName: this.page.getByTestId('user-name'),
      errorUserName: this.page.getByTestId('error-login-id'),
      errorUserPassword: this.page.getByTestId('error-login-password'),
    };
  }

  async LoginUser(userLogin: string, userPassword: string) {
    await this.elements.login.fill(userLogin);
    await this.elements.password.fill(userPassword);
  }
}
