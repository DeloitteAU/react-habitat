var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        filename: 'dist/app.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/, // Matches .js and .jsx files
                exclude:/node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        // Auto open the demo
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};