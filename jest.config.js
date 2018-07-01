module.exports = {
  projects: ['<rootDir>/src/client', '<rootDir>/src/server'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '**/*.test.{js,jsx}',
    '!**/node_modules/**'
  ]
};
