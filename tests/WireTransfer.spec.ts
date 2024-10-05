import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { WireTransfer } from '../pages/WireTransfer.pages';
import { LoginData } from '../test-data/LoginData.data';
import { WireData } from '../test-data/WireData.data';

test.describe('Test option to send quick wire transfer', () => {
  let login: Login;
  let wireTransfer: WireTransfer;

  test.beforeEach(async ({ page }) => {
    // Arrange
    login = new Login(page);
    wireTransfer = new WireTransfer(page);
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;

    //Act
    await page.goto('/');
    await login.LoginUser(userName, userPassword);
    await login.elements.buttonLogin.click();
  });

  test('Wire transfer with correct data', async ({ page }) => {
    //Arrange
    const wireReceiverOption = WireData.CorrectWire.wireReciever;
    const wireAmount = WireData.CorrectWire.wireAmount;
    const wireTitle = WireData.CorrectWire.wireTitle;
    const expectedMessage = `Przelew wykonany!Odbiorca: Michael ScottKwota: ${wireAmount},00PLN Nazwa: ${wireTitle}`;

    //Act
    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);

    //Assert
    await expect(page.getByRole('paragraph')).toContainText(expectedMessage);
    await wireTransfer.elements.closeButton.click();
  });

  test('Wire transfer without title', async ({ page }) => {
    //Arrange
    const wireReceiverOption = WireData.EmptyTitle.wireReciever;
    const wireAmount = WireData.EmptyTitle.wireAmount;
    const wireTitle = WireData.EmptyTitle.wireTitle;
    const errorMessage = WireData.EmptyTitle.errorMessage;

    //Act
    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);

    //Assert
    await expect(
      page.getByTestId('error-widget-1-transfer-title'),
    ).toContainText(errorMessage);
  });

  test('Wire transfer without cash amount', async ({ page }) => {
    //Arrange
    const wireReceiverOption = WireData.EmptyAmount.wireReciever;
    const wireAmount = WireData.EmptyAmount.wireAmount;
    const wireTitle = WireData.EmptyAmount.wireTitle;
    const errorMessage = WireData.EmptyAmount.errorMessage;

    //Act
    await wireTransfer.sendWire(wireReceiverOption, wireAmount, wireTitle);

    //Assert
    await expect(
      page.getByTestId('error-widget-1-transfer-amount'),
    ).toContainText(errorMessage);
  });
});
