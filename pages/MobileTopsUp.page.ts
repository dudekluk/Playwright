import { Locator, Page } from '@playwright/test';

export class PhoneTopUp {
  private page: Page;
  readonly elements: Record<string, Locator>;
  readonly phoneNavButton: Locator;
  readonly infoMessage: Locator;
  readonly closePopUp: Locator;
  readonly errorMessage: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      phoneSelect: this.page.locator('#widget_1_topup_receiver'),
      cash: this.page.locator('#widget_1_topup_amount'),
      checkBox: this.page.locator('#uniform-widget_1_topup_agreement'),
      send: this.page.getByRole('button', { name: 'doładuj telefon' }),
    };
    this.phoneNavButton = page.getByRole('link', {
      name: 'doładowanie telefonu',
      exact: true,
    });
    this.infoMessage = page.getByTestId('message-text');
    this.closePopUp = page.getByRole('button', { name: 'ok' });
    this.errorMessage = {
      topUpReceiver: this.page.getByTestId('error-widget-1-topup-receiver'),
      topUpAmount: this.page.getByTestId('error-widget-1-topup-amount'),
      checkBox: this.page.getByTestId('error_widget_1_topup_agreement'),
    };
  }

  public async sendPhoneTopUp(topUpReceiver: string, topUpAmount: string) {
    await this.elements.phoneSelect.selectOption(topUpReceiver);
    await this.elements.cash.fill(topUpAmount);
    await this.elements.checkBox.check();

    if (topUpReceiver && topUpAmount) {
      await this.elements.send.click();
      await this.closePopUp.click();
    }
  }
}
