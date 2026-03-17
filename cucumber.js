module.exports = {
  default: "tests/features/**/*.feature --require-module ts-node/register --require tests/step-definitions/**/*.ts --require tests/support/**/*.ts --format progress",
  sanity: "--tags @sanity",
  regression: "--tags @regression"
};
