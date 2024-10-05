import { Locator, Page } from '@playwright/test';

export class Raport {
  private page: Page;
  public elements: Record<string, Locator>;
  public raportNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
      halfYearDownloadTxt: this.page.getByRole('link', {
        name: 'Pobierz jako txt',
      }),
      halfYearDownloadZip: this.page.getByRole('link', {
        name: 'Pobierz jako zip',
      }),
      selectTextFile: this.page.locator('#my_file_1'),
      uploadButton: this.page.locator('#send_btn'),
    };
    this.raportNavButton = page.getByRole('link', {
      name: 'raporty',
      exact: true,
    });
  }
}
