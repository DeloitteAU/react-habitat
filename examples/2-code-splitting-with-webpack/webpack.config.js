const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: './src/App.js',
	output: {
		filename: 'app.bundle.js',
		chunkFilename: 'app.[id].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist/'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules:[
			{
				test: /\.jsx?$/, // Matches .js and .jsx files
				exclude:/node_modules/,
				loader: 'babel-loader',
			},
		]
	},
	plugins: [
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 1
		}),

		// Auto open the demo
		new OpenBrowserPlugin({ url: 'http://localhost:8080' })
	]
};