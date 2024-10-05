import { Locator, Page } from '@playwright/test';

export class Login {
  private page: Page;
  public elements: Record<string, Locator>;
  constructor(page: Page) {
    this.page = page;
    this.elements = {
      login: this.page.getByTestId('login-input'),
      password: this.page.getByTestId('password-input'),
      buttonLogin: this.page.getByTestId('login-button'),
    };
  }

  async LoginUser(userLogin: string, userPassword: string) {
    await this.elements.login.fill(userLogin);
    await this.elements.password.fill(userPassword);
  }
}
