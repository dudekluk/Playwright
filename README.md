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
6. Downlad and upload reports.
7. Mobile phone top ups.

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

### Payment tests (`Payments.spec.ts`)

```javascript
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
    await login.loginWithCredentials(userName, userPassword);
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
    await expect(payment.messages.successPayment).toContainText(
      expectedMessage,
    );
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

    await expect(payment.messages.errorBankAccount).toContainText(errorMessage);
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

    await expect(payment.messages.errorRecipientName).toContainText(errorMessage);
  });
});


```



### Page Object Model (POM) for payment tests (`Payments.pages.ts`)

```javascript
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


```

### Data for payment tests (`PaymentData.data.ts`)

```javascript
export const PaymentnData = {
  CorrectPayment: {
    paymentAmount: '200',
    paymentTitle: 'Przelew za robotę',
    recipientName: 'Marek',
    bankAccount: '12 3456 7890 1234 5678 9012 3456 7890',
  },
  EmptyAccount: {
    paymentAmount: '4500',
    paymentTitle: 'Wypłata za mieś czerwiec',
    recipientName: 'Łukasz',
    bankAccount: '',
    errorMessage: 'pole wymagane',
  },
  EmptyName: {
    paymentAmount: '150',
    paymentTitle: 'Zakup artykułów spożywczych',
    recipientName: '',
    bankAccount: '12 3456 7890 1234 5678 9012 3456 7890',
    errorMessage: 'pole wymagane',
  },
};


```
