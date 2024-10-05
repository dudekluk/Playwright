import { Locator, Page } from '@playwright/test';

export class WireTransfer {
  private page: Page;
  public elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      receiverInput: this.page.locator('#widget_1_transfer_receiver'),
      amountInput: this.page.locator('#widget_1_transfer_amount'),
      titleInput: this.page.locator('#widget_1_transfer_title'),
      sendButton: this.page.getByRole('button', { name: 'wykonaj' }),
      closeButton: this.page.getByTestId('close-button'),
    };
  }

  async sendWire(wireReceiver: string, wireAmount: string, wireTitle: string) {
    await this.elements.receiverInput.selectOption(wireReceiver);
    await this.elements.amountInput.fill(wireAmount);
    await this.elements.titleInput.fill(wireTitle);

    await this.elements.sendButton.click();
  }
}
