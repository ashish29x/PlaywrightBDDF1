import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

export class CustomWorld {
  browser?: Browser;
  context!: BrowserContext;
  page!: Page;
  credentials: any;
  testData: any;

  constructor() {
    // Load fixture data so steps can reference them via `this`
    // Use relative paths from the compiled output; require works with ts-node
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.credentials = require('../fixtures/credentials.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.testData = require('../fixtures/testData.json');
  }
}

setWorldConstructor(CustomWorld);
