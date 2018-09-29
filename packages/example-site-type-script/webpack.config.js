var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
   mode: 'development',
    entry: {
       // React Habitat requires Object.assign pollyfill for old IE support
       vendor: ['babel-polyfill', 'react', 'react-dom', 'react-habitat'],

        // Our main app
        app: ['./src/App.ts']
    },
    output: {
         filename: '[name].[chunkhash:22].js',
         chunkFilename: '[name].[chunkhash:22].js',
         path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
           {
	           test: /\.tsx?$/,
              exclude: /node_modules/,
	           use: 'ts-loader',
           }
        ]
    },
    plugins: [
         new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs'
         }),
       new CopyWebpackPlugin([{
          from: 'src/ajaxData.html',
          to: path.join(__dirname, 'dist')
       }])
    ],
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
   }
};