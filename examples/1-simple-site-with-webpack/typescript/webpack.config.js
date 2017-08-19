var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/App.ts',
    output: {
        filename: 'dist/app.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
	        {
	            test: /\.ts(x?)$/,
                exclude:/node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    plugins: [
        // Auto open the demo
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    ],
};
