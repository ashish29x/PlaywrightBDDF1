import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomWorld } from '../support/world';

Given('I am logged in', async function (this: CustomWorld) {
  const loginPage = new (await import('../pages/LoginPage')).LoginPage(this.page);
  const creds = this.credentials.validUser;
  await loginPage.goto();
  await loginPage.login(creds.username, creds.password);
});

When('I open the dashboard', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'networkidle' });
});

Then('I should see the welcome message', async function (this: CustomWorld) {
  const dashboard = new DashboardPage(this.page);
  const text = await dashboard.getTitleText();
  expect(text).to.include(this.testData.dashboard.welcomeText);
});
