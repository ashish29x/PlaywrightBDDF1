const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const statePath = 'tests/support/storageState.json';

  // Allow overriding credentials via env vars for CI or local use
  const fixtures = require('../tests/fixtures/credentials.json');
  const creds = {
    username: process.env.TEST_USERNAME || fixtures.validUser.username,
    password: process.env.TEST_PASSWORD || fixtures.validUser.password,
  };

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to Sauce Demo and performing login...');
  await page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });
  await page.fill('#user-name', creds.username);
  await page.fill('#password', creds.password);
  await page.click('#login-button');
  //await page.locator('.title').waitFor({ timeout: 5000 });
  await page.locator('.title').waitFor({ state: 'visible', timeout: 5000 });

  await context.storageState({ path: statePath });
  console.log(`Saved storage state to ${statePath}`);

  await browser.close();
})();
