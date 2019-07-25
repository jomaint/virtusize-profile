const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const BUILD_DIR = path.resolve(__dirname, 'static');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
    output: {
        path: `${BUILD_DIR}/prod/`,
        publicPath: 'prod/',
        filename: '[name].[chunkHash].js'
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            name: true,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                default: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    chunks: 'all',
                    minChunks: 2,
                    reuseExistingChunk: true
                },
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma:8,
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    plugins: [

        new CleanWebpackPlugin([`${BUILD_DIR}/prod`]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[contenthash].css',
        }),

        new HtmlWebpackPlugin({
            title: 'A Virtusize Assignment',
            filename: '../../dist/index_live.html',
            template: 'dist/index_deploy.ejs',
            hash: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            include: [path.resolve(__dirname, './sass')]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            include: [path.resolve(__dirname, './sass')]
                        }
                    }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            include: [path.resolve(__dirname, './sass')]
                        }
                    }]
            }]
    }

});
