import { Page } from '@playwright/test';

export class Payment {
  constructor(private page: Page) {}

  paymentClick = this.page.getByRole('link', { name: 'płatności' });
  paymentRecipientName = this.page.getByTestId('transfer_receiver');
  recipientBankAccount = this.page.getByTestId('form_account_to');
  paymentAmountInput = this.page.getByTestId('form_amount');
  paymentTitle = this.page.getByTestId('form_title');
  paymentSent =this.page.getByRole('button', { name: 'wykonaj przelew' })

  async sendPayment(
    paymentAmount: string,
    paymentTitle: string,
    recipientName: string,
    bankAccount: string,
  ) {
    await this.paymentClick.click();
    await this.paymentRecipientName.fill(recipientName);
    await this.recipientBankAccount.fill(bankAccount);
    await this.paymentAmountInput.fill(paymentAmount);
    await this.paymentTitle.fill(paymentTitle);
    await this.paymentSent.click()
  }
}
