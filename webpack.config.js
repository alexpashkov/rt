const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/client/index.js',
  output: {
    filename: 'app.bundle.js',
    path: __dirname + '/src/server/public',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          //          options: {
          //            presets: ['@babel/preset-env', '@babel/react'],
          //            plugins: [
          //              '@babel/plugin-proposal-object-rest-spread',
          //              '@babel/plugin-proposal-class-properties',
          //            ],
          //          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + '/src/server/public/index.html',
      template: __dirname + '/src/client/index.html',
    }),
  ],
};
