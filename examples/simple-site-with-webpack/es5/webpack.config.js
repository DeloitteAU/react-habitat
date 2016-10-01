var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {

        // Our main app
        app: ['./src/App.js'],

        // React Habitat requires Object.assign pollyfill for old IE support
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-habitat']
    },
    output: {
        filename: 'dist/app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders:[
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' }
        ]
    },
    plugins: [

        // Split our app code and libraries. See "Entry" config above
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"dist/vendor.bundle.js"),

        // Minimize bundles
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),

        // Auto open the demo
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};