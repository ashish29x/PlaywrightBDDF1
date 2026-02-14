import { Page } from 'playwright';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly submitBtn = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // Navigate to Sauce Demo login page
    await this.page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitBtn);
    // Wait for the Products title on the inventory page after successful login
    await this.page.locator('.title').waitFor({ timeout: 5000 });
  }

  async isAtDashboard(): Promise<boolean> {
    return (await this.page.locator('.title').count()) > 0;
  }
}
