import { Locator, Page } from '@playwright/test';

export class Payment {
  private page: Page;
  public elements: Record<string, Locator>;
  public messages: Record<string, Locator>;
  public paymentNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      recipientNameInput: this.page.getByTestId('transfer_receiver'),
      bankAccountInput: this.page.getByTestId('form_account_to'),
      amountInput: this.page.getByTestId('form_amount'),
      titleInput: this.page.getByTestId('form_title'),
      sendButton: this.page.getByRole('button', { name: 'wykonaj przelew' }),
    };
    this.messages = {
      successPayment: this.page.getByRole('paragraph'),
      errorBankAccount: this.page.getByTestId(
        'error-widget-2-transfer-account',
      ),
      errorRecipientName: this.page.getByTestId(
        'error-widget-4-transfer-receiver',
      ),
    };
    this.paymentNavButton = page.getByRole('link', { name: 'płatności' });
  }

  async sendPayment(
    paymentAmount: string,
    paymentTitle: string,
    recipientName: string,
    bankAccount: string,
  ) {
    await this.paymentNavButton.click();
    await this.elements.recipientNameInput.fill(recipientName);
    await this.elements.bankAccountInput.fill(bankAccount);
    await this.elements.amountInput.fill(paymentAmount);
    await this.elements.titleInput.fill(paymentTitle);
    await this.elements.sendButton.click();
  }
}
