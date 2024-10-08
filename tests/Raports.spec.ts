import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { LoginData } from '../test-data/LoginData.data';
import { Raport } from '../pages/Raports.page';
import path from 'path';

test.describe('Test reports download and upload', () => {
  let login: Login;
  let raport: Raport;
  test.beforeEach(async ({ page }) => {
    // Arrange:
    login = new Login(page);
    raport = new Raport(page);
    const userName = LoginData.CorrectLogin.userName;
    const userPassword = LoginData.CorrectLogin.userPassword;

    // Act:
    await page.goto('/');
    await login.loginWithCredentials(userName, userPassword);
    await raport.raportNavButton.click();
  });

  test('Download txt raport', async ({ page }) => {
    // Arrange:
    const fileDir = 'C:/Projekts/Bank/Downloads/';

    // Act:
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      raport.elements.halfYearDownloadTxt.click(),
    ]);
    await download.saveAs(fileDir + download.suggestedFilename());

    // Assert:
    await expect(download.suggestedFilename()).toBe('report-1.txt');
  });

  test('Download zip raport', async ({ page }) => {
    // Arrange:
    const fileDir = 'C:/Projekts/Bank/Downloads/';

    // Act:
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      raport.elements.halfYearDownloadZip.click(),
    ]);
    await download.saveAs(fileDir + download.suggestedFilename());

    // Assert:
    await expect(download.suggestedFilename()).toBe('report-1.zip');
  });

  test('Upload txt raport', async ({ page }) => {
    // Arrange:
    const fileDir = 'C:/Projekts/Bank/Downloads/';
    const fileName = 'report-1.txt';
    const confirmMessage = `Plik przesłany! ${fileName}`;

    // Act:
    // await page.waitForTimeout(300);
    await page.waitForLoadState();
    await raport.elements.selectTextFile.setInputFiles(
      path.join(fileDir + fileName),
    );
    await raport.elements.uploadButton.click();

    // Assert:
    await expect.soft(page.locator('.filename').first()).toHaveText(fileName);
    await expect
      .soft(page.getByTestId('message-text'))
      .toHaveText(confirmMessage);
  });
});
