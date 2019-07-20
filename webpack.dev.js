const merge = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PUBLIC_PATH = 'http://localhost:8080/assets/';
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: PUBLIC_PATH,
        filename: "[name].js",
    },
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			name: true,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					enforce: true,
					reuseExistingChunk: true
				},
				// default: false
			}
		}
	},
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include : path.join(__dirname, 'dist/static/images'),
                loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
            }, // inline base64 URLs for <=30k images, direct URLs for the rest
			{
				test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "style.css",
            chunkFilename: "[name].css"
        })
    ],
	devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,
        host: 'localhost',
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: PUBLIC_PATH,
        port: 8080
    }
})
