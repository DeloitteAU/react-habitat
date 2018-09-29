var webpack = require('webpack');

var env = process.env.NODE_ENV;

// configuration
var config = {
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		library: 'ReactHabitatRedux',
		libraryTarget: 'umd'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'redux': 'Redux',
		'react-redux': 'ReactRedux',
		'react-habitat': 'ReactHabitat'
	},
	plugins: [
		{
			apply: function apply(compiler) {
				compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
					this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()");
					return false;
				})
			}
		},
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
};

module.exports = config;
