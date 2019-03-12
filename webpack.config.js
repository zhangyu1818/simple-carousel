const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './src/index.ts',
        demo: './src/demo.ts',
    },
    output: {
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 2,
                                    helpers: true,
                                    regenerator: true,
                                    useESModules: false,
                                },
                            ],
                            '@babel/plugin-transform-typescript',
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['demo'],
        }),
    ],
    devServer: {
        compress: false,
        open: true,
    },
};
