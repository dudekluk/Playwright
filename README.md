 <h1>Autmation E2E tests using Playwright</h1> 

 This project focuses on automating End-to-End (E2E) testing for the fictional bank website, [Demo Bank](https://demo-bank.vercel.app/), using Playwright.


 <h2 id="Test-plan">Test plan</h2>

### Description
The primary goal of this project is to ensure the quality and reliability of the web banking application's login functionality and bank transfer options. We will conduct functional testing to verify the correct operation of both features, covering various scenarios, including successful and failed login attempts and different bank transfer types. To ensure comprehensive testing, we will strive to execute 100% of all relevant test cases. 


### Scope of Testing

1. Verify successful login with valid credentials.
2. Test failed login with invalid credentials.
3. Validate password strength requirements.
4. Test the quick wire option.
5. Test bank wire functionality with full information.

### Testing Environment

- **Operating System**: Windows 11
- **Browser**: Google Chrome

### Types of Tests

1. **Functional Tests**: To verify that each featcher works according to the requirements.


### Resources

- **Automation tester**: Responsible for creating and executing automated E2E testing with Playwright
- **Tools**:
   * Visual Studio Code
   * Git and Github
   * Playwright with extensions
 


<h1>Example tests for payment method</h1> 

### Payment tests (`Payments.pages.ts`)

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';
import { Payment } from '../pages/Payments.pages';
import { PaymentnData } from '../test-data/PaymentData.data';

test.describe('Send bank payment', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const loginPage = new LoginPage(page);
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;

    //Act
    await page.goto(url);
    await loginPage.login(userName, userPassword);
    await loginPage.loginButton.click();
  });

  test('Payment with correct data', async ({ page }) => {
    //Arrange
    const payment = new Payment(page);
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
    const payment = new Payment(page);
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
    const payment = new Payment(page);
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
```



### Page Object Model (POM) for payment tests (`Payments.pages.ts`)

```javascript
import { Page } from '@playwright/test';

export class Payment {
  constructor(private page: Page) {}

  paymentClick = this.page.getByRole('link', { name: 'płatności' });
  paymentRecipientName = this.page.getByTestId('transfer_receiver');
  recipientBankAccount = this.page.getByTestId('form_account_to');
  paymentAmountInput = this.page.getByTestId('form_amount');
  paymentTitle = this.page.getByTestId('form_title');
  paymentSent = this.page.getByRole('button', { name: 'wykonaj przelew' });



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
    await this.paymentSent.click();
  }
}

```

### Data for payment tests (`PaymentData.data.ts`)

```javascript
export const PaymentnData = {
  CorrectPayment: {
    paymentAmount: '200',
    paymentTitle: 'Przelew za robotę',
    recipientName: 'Marek',
    bankAccount: '12 3333 3333 3333 3333 3333 33333',
  },
  EmptyAccount: {
    paymentAmount: '200',
    paymentTitle: 'Przelew za robotę',
    recipientName: 'Marek',
    bankAccount: '',
    errorMessage: 'pole wymagane',
  },
  EmptyName: {
    paymentAmount: '200',
    paymentTitle: 'Przelew za robotę',
    recipientName: '',
    bankAccount: '12 3333 3333 3333 3333 3333 33333',
    errorMessage: 'pole wymagane',
  },
};

```
