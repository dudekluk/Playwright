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
import { Login } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';

test.describe('Login to Bank', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await page.goto('/');
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;
    const expectedUserName = LoginData.CorrectLogin.Message;

    // Act
    await login.LoginUser(userName, userPassword);
    await login.elements.buttonLogin.click();

    // Assert
    await expect(login.messages.confirmUserName).toHaveText(expectedUserName);
  });

  test('Failed login with wrong login', async ({ page }) => {
    // Arrange
    const incorrectuserName = LoginData.ShortLogin.userName;
    const userPassword = LoginData.ShortLogin.userPassword;
    const expectedErrorMessage = LoginData.ShortLogin.Message;

    // Act
    await login.LoginUser(incorrectuserName, userPassword);

    // Assert
    await expect(login.messages.errorUserName).toHaveText(expectedErrorMessage);
  });

  test('Failed login with wrong password', async ({ page }) => {
    // Arrange
    const userName = LoginData.ShortPassword.userName;
    const incorrectPassword = LoginData.ShortPassword.userPassword;
    const expectedErrorMessage = LoginData.ShortPassword.Message;

    // Act
    await login.LoginUser(userName, incorrectPassword);
    await login.elements.login.click();

    // Assert
    await expect(login.messages.errorUserPassword).toHaveText(
      expectedErrorMessage,
    );
  });
});


```



### Page Object Model (POM) for payment tests (`Payments.pages.ts`)

```javascript
import { Locator, Page } from '@playwright/test';

export class Login {
  private page: Page;
  public elements: Record<string, Locator>;
  public messages: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      login: this.page.getByTestId('login-input'),
      password: this.page.getByTestId('password-input'),
      buttonLogin: this.page.getByTestId('login-button'),
    };
    this.messages = {
      confirmUserName: this.page.getByTestId('user-name'),
      errorUserName: this.page.getByTestId('error-login-id'),
      errorUserPassword: this.page.getByTestId('error-login-password'),
    };
  }

  async LoginUser(userLogin: string, userPassword: string) {
    await this.elements.login.fill(userLogin);
    await this.elements.password.fill(userPassword);
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
