import { Page } from 'playwright';

export class DashboardPage {
  readonly page: Page;
  readonly titleSelector = '.title';

  constructor(page: Page) {
    this.page = page;
  }

  async isTitleVisible(): Promise<boolean> {
    return (await this.page.locator(this.titleSelector).count()) > 0;
  }

  async getTitleText(): Promise<string> {
    return (await this.page.textContent(this.titleSelector)) || '';
  }
}
