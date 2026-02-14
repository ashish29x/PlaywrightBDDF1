const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const jsonPath = 'reports/cucumber.json';
const outputPath = 'reports/cucumber-report.html';

if (!fs.existsSync(jsonPath)) {
  console.error('JSON report not found at', jsonPath);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonPath,
  output: outputPath,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'Test Environment': 'Sauce Demo',
    Platform: process.platform,
    'Executed': new Date().toISOString()
  }
};

reporter.generate(options);
console.log('Generated HTML report at', outputPath);
