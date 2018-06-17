const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: __dirname + '/src/client/index.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/src/server/public'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/src/server/public/index.html',
            template: __dirname + '/src/client/index.html'
        })
    ],
    devServer: {
        contentBase: './src/server/public',
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true
            },
            '/': {
                target: 'http://localhost:3000'
            }
        }
    }
};
