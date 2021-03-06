module.exports = {
  name: 'client',
  displayName: 'client',
  rootDir: './',
  testEnvironment: 'jsdom',
  testURL: 'http://redtetris.com/',
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.test.{js.jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': 'identity-obj-proxy'
  }
};
