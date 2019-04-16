const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (env, { mode }) => {
    const config = {
        mode,
        entry: {
            index: './src/index.ts',
        },
        output: {
            filename: '[name].js',
            library: 'Carousel',
            libraryTarget: 'umd',
            libraryExport: 'default'
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
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-typescript', '@babel/plugin-proposal-class-properties'],
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
                        'postcss-loader',
                    ],
                },
            ],
        },
    };
    const dev = {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            compress: false,
            open: true,
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'head',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    };
    const prod = {
        mode: 'production',
        plugins: [new CleanWebpackPlugin()],
        devtool: 'none',
    };
    return mode === 'production' ? merge(config, prod) : merge(config, dev);
};
