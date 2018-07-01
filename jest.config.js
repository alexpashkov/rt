module.exports = {
  projects: ['<rootDir>/src/client', '<rootDir>/src/server'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.test.{js,jsx}',
    '!**/*.config.{js,jsx}',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  }
};
