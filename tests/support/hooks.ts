import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';

setDefaultTimeout(60_000);
let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });

  // Ensure storageState exists; if missing, perform a login and save it so tests can reuse the authenticated session
  const statePath = 'tests/support/storageState.json';
  try {
    const needCreate = !fs.existsSync(statePath) || fs.statSync(statePath).size === 0;
    if (needCreate) {
      // Load credentials from fixtures (allows env overrides in scripts)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const creds = require('../fixtures/credentials.json').validUser;
      const ctx = await browser.newContext();
      const page = await ctx.newPage();

      await page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });
      await page.fill('#user-name', creds.username);
      await page.fill('#password', creds.password);
      await page.click('#login-button');
      await page.locator('.title').waitFor({ timeout: 5000 });

      await ctx.storageState({ path: statePath });
      await page.close();
      await ctx.close();
      console.log('Generated storage state at', statePath);
    }
  } catch (e) {
    // If anything goes wrong, log and continue; tests will still open fresh contexts
    console.warn('Could not generate storage state:', e);
  }
});

Before(async function (this: any) {
  // create a new context + page for each scenario
  this.context = await browser.newContext({ storageState: 'tests/support/storageState.json' });
  this.page = await this.context.newPage();
});

After(async function (this: any) {
  // persist storage state for the scenario (optional)
  try {
    const state = await this.context.storageState();
    fs.writeFileSync('tests/support/storageState.json', JSON.stringify(state, null, 2));
  } catch (e) {
    // ignore
  }

  if (this.page && !this.page.isClosed()) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (browser) await browser.close();
});
