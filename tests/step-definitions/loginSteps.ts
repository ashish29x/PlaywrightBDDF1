import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomWorld } from '../support/world';

Given('I open the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('I login with valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const creds = this.credentials.validUser;
  await loginPage.login(creds.username, creds.password);
});

Then('I should see the dashboard', async function (this: CustomWorld) {
  const dashboard = new DashboardPage(this.page);
  const visible = await dashboard.isTitleVisible();
  expect(visible).to.equal(true);
});
