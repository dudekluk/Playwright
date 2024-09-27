import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { WireTransfer } from '../pages/WireTransfer.pages';

test.describe('Login to Bank', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const loginPage = new LoginPage(page);
    const userName = 'JanKowal';
    const userPassword = 'JanKowal1234';

    //Act
    await page.goto(url);
    await loginPage.login(userName, userPassword);
    await loginPage.loginButton.click();
  });

  test('Wire transfer with correct data', async ({ page }) => {
    //Arrange
    const wireTransfer = new WireTransfer(page);
    const wireReceiverOption = '3';
    const wireAmount = '100';
    const wireTitle = 'Przelew za kwiatki';
    const expectedMessage = `Przelew wykonany!Odbiorca: Michael ScottKwota: ${wireAmount},00PLN Nazwa: ${wireTitle}`;

    //Act
    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);

    //Assert
    await expect(page.getByRole('paragraph')).toContainText(expectedMessage);
    await wireTransfer.wireCloseButton.click();
  });

  test('Wire transfer without title', async ({ page }) => {
    //Arrange
    const wireTransfer = new WireTransfer(page);
    const wireReceiverOption = '3';
    const wireAmount = '100';
    const wireTitle = '';
    const errorMessage = 'pole wymagane';

    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);
    //Assert
    await expect(
      page.getByTestId('error-widget-1-transfer-title'),
    ).toContainText(errorMessage);
  });

  test('Wire transfer without cash amount', async ({ page }) => {
    //Arrange
    const wireTransfer = new WireTransfer(page);
    const wireReceiverOption = '3';
    const wireAmount = '';
    const wireTitle = 'Przelew za kwiatki';
    const errorMessage = 'pole wymagane';

    //Act
    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);

    //Assert
    await expect(
      page.getByTestId('error-widget-1-transfer-amount'),
    ).toContainText(errorMessage);
  });
});
