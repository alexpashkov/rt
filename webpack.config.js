const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/client/index.js',
  output: {
    filename: 'app.bundle.js',
    path: __dirname + '/src/server/public',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + '/src/server/public/index.html',
      template: __dirname + '/src/client/index.html',
    }),
  ],
};
