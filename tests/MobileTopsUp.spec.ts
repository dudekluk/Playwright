import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { PhoneTopUp } from '../pages/MobileTopsUp.page';
import { LoginData } from '../test-data/LoginData.data';

test.describe('Test mobile phone top up', () => {
  let login: Login;
  let phoneTopUp: PhoneTopUp;

  test.beforeEach(async ({ page }) => {
    // Arrange:
    login = new Login(page);
    phoneTopUp = new PhoneTopUp(page);
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;

    // Act:
    await page.goto('/');
    await login.loginWithCredentials(userName, userPassword);
    await phoneTopUp.phoneNavButton.click();
  });

  test('mobile phone top up with correct data', async ({ page }) => {
    // Arrange:
    const phoneCash = '30';
    const accNumber = '500 xxx xxx';
    const infoMessage = `Doładowanie wykonane! ${phoneCash},00PLN na numer ${accNumber}`;

    // Act:
    // await phoneTopUp.elements.phoneSelect.selectOption(accNumber);
    // await phoneTopUp.elements.cash.fill(PhoneCash);
    // await phoneTopUp.elements.checkBox.check();

    // await phoneTopUp.elements.send.click();
    // await phoneTopUp.closePopUp.click();

    await phoneTopUp.sendPhoneTopUp(accNumber, phoneCash);

    // Assert:
    await expect(phoneTopUp.infoMessage).toHaveText(infoMessage);
  });

  test('mobile phone top up without receiver number', async ({ page }) => {
    // Arrange:
    const phoneCash = '30';
    const accNumber = '';
    const errorMessage = 'pole wymagane';

    // Act:
    await phoneTopUp.sendPhoneTopUp(accNumber, phoneCash);

    // Assert:
    await expect(phoneTopUp.errorMessage.topUpReceiver).toHaveText(
      errorMessage,
    );
  });

  test('mobile phone top up without cash amount', async ({ page }) => {
    // Arrange:
    const phoneCash = '';
    const accNumber = '500 xxx xxx';
    const errorMessage = 'pole wymagane';

    // Act:
    await phoneTopUp.sendPhoneTopUp(accNumber, phoneCash);

    // Assert:
    await expect(phoneTopUp.errorMessage.topUpAmount).toHaveText(errorMessage);
  });
});
