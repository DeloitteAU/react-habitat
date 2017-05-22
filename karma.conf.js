module.exports = function(config) {
	config.set({
		basePath: './',
		frameworks: ['polyfill', 'jasmine'],
		polyfill: ['Object.assign', 'MutationObserver'],
		files: [
			'tests/**/*.spec.js'
		],

		preprocessors: {
			// add webpack as preprocessor
			'tests/*.spec.js': ['webpack'],
			'tests/**/*.spec.js': ['webpack'],
			'tests/mochs/*.jsx': ['webpack']
		},

		webpack: {
			// karma watches the test entry points
			// (you don't need to specify the entry option)
			// webpack watches dependencies

			// webpack configuration
			resolve: {
				// Add `.ts` and `.tsx` as a resolvable extension.
				extensions: ['', '.jsx', '.js', '.es6']
			},

			module: {
				loaders: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						loader: 'babel-loader'
					}
				]
			}
		},

		phantomjsLauncher: {
			// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			exitOnResourceError: true
		},

		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			stats: 'errors-only'
		}


	});
};
