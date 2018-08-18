module.exports = {
  name: 'server',
  displayName: 'server',
  rootDir: './',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.test.{js.jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/jest.config.js",
    "!**/coverage/lcov-report/*",
    "!**/public/*"
  ],
};
