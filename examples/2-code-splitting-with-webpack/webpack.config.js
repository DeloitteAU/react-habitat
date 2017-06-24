const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: {
		// Our main app
		app: ['./src/App.js'],


		vendor: [
			'babel-polyfill', // React Habitat requires Object.assign pollyfill for old IE support
			'mutationobserver-shim',
			'react',
			'react-dom',
			'react-habitat'
		]
	},
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
				options: {
					presets: ['es2015', 'react']
				}
			},
		]
	},
	plugins: [

		// Split our app code and libraries. See "Entry" config above
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js"
		}),

		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 1
		}),

		// Auto open the demo
		new OpenBrowserPlugin({ url: 'http://localhost:8080' })
	]
};