const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'src');
var CACHE_DIR = path.resolve(__dirname, 'babel-cache');
// console.log(path.resolve(__dirname, 'node_modules'));
module.exports = {
	entry: {
		bundle: ['@babel/polyfill', `${APP_DIR}`]
	},
	node: {
		console: false,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	resolve: {
		extensions: ['.wasm', '.mjs', '.js', '.jsx','.json'],
		modules: [
			path.resolve(__dirname, '.'),
			path.resolve(__dirname, 'sass'),
			path.resolve(__dirname, 'node_modules')
		]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				use: {
					loader: 'babel-loader',

					options: {
						cacheDirectory: CACHE_DIR,
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	}
};
