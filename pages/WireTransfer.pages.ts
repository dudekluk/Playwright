import { Page } from '@playwright/test';

export class WireTransfer {
  constructor(private page: Page) {}

  wireReceiverInput = this.page.locator('#widget_1_transfer_receiver');

  wireAmountInput = this.page.locator('#widget_1_transfer_amount');
  wireTitleInput = this.page.locator('#widget_1_transfer_title');
  wireSendButton = this.page.getByRole('button', { name: 'wykonaj' });
  wireCloseButton = this.page.getByTestId('close-button');

  async sendWire(wireReceiver: string, wireAmount: string, wireTitle: string) {
    await this.wireReceiverInput.selectOption(wireReceiver);
    await this.wireAmountInput.fill(wireAmount);
    await this.wireTitleInput.fill(wireTitle);

    await this.wireSendButton.click();
  }
}
