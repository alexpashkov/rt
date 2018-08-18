module.exports = {
  name: 'server',
  displayName: 'server',
  rootDir: './',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/*.test.js",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/jest.config.js",
    "!**/coverage/lcov-report/*",
    "!**/public/*"
  ],
};
