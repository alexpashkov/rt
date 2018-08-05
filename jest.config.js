module.exports = {
  projects: [
    '<rootDir>/src/client',
    '<rootDir>/src/server',
    '<rootDir>/src/shared'
  ],
  // collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.test.{js,jsx}',
    '!**/*.config.{js,jsx}',
    '!**/node_modules/**',
    '!**/public/**'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 50,
      functions: 75,
      lines: 75
    }
  }
};
