import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';
import { Payment } from '../pages/Payments.pages';
import { PaymentnData } from '../test-data/PaymentData.data';

test.describe('Test sending bank transfer', () => {
  let login: Login;
  let payment: Payment;
  test.beforeEach(async ({ page }) => {
    // Arrange
    login = new Login(page);
    payment = new Payment(page);
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;

    //Act
    await page.goto('/');
    await login.LoginUser(userName, userPassword);
    await login.elements.buttonLogin.click();
  });

  test('Payment with correct data', async ({ page }) => {
    //Arrange
    const recipientName = PaymentnData.CorrectPayment.recipientName;
    const bankAccount = PaymentnData.CorrectPayment.bankAccount;
    const paymentAmount = PaymentnData.CorrectPayment.paymentAmount;
    const paymentTitle = PaymentnData.CorrectPayment.paymentTitle;

    const expectedMessage = `Przelew wykonany!Odbiorca: ${recipientName}Kwota: ${paymentAmount},00PLN Nazwa: ${paymentTitle}`;

    //Act
    await payment.sendPayment(
      paymentAmount,
      paymentTitle,
      recipientName,
      bankAccount,
    );
    //Assert
    await expect(page.getByRole('paragraph')).toContainText(expectedMessage);
  });

  test('Payment without bank account number', async ({ page }) => {
    //Arrange
    const recipientName = PaymentnData.EmptyAccount.recipientName;
    const bankAccount = PaymentnData.EmptyAccount.bankAccount;
    const paymentAmount = PaymentnData.EmptyAccount.paymentAmount;
    const paymentTitle = PaymentnData.EmptyAccount.paymentTitle;
    const errorMessage = PaymentnData.EmptyAccount.errorMessage;

    //Act
    await payment.sendPayment(
      paymentAmount,
      paymentTitle,
      recipientName,
      bankAccount,
    );
    //Assert

    await expect(
      page.getByTestId('error-widget-2-transfer-account'),
    ).toContainText(errorMessage);
  });

  test('Payment without recipient name', async ({ page }) => {
    //Arrange
    const recipientName = PaymentnData.EmptyName.recipientName;
    const bankAccount = PaymentnData.EmptyName.bankAccount;
    const paymentAmount = PaymentnData.EmptyName.paymentAmount;
    const paymentTitle = PaymentnData.EmptyName.paymentTitle;
    const errorMessage = PaymentnData.EmptyName.errorMessage;

    //Act
    await payment.sendPayment(
      paymentAmount,
      paymentTitle,
      recipientName,
      bankAccount,
    );
    //Assert

    await expect(
      page.getByTestId('error-widget-4-transfer-receiver'),
    ).toContainText(errorMessage);
  });
});
