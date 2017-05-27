module.exports = function(config) {
	const configuration = {
		basePath: './',
		frameworks: ['jasmine'],
		//polyfill: ['Promise', 'Object.assign', 'MutationObserver'],
		files: [
			'tests/**/*.spec.js'
		],

		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},

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

		// phantomjsLauncher: {
		// 	// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
		// 	exitOnResourceError: true
		// },

		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			stats: 'errors-only'
		}
	};

	// if (process.env.TRAVIS) {
	// 	configuration.browsers = ['Chrome_travis_ci'];
	// } else {
	// 	configuration.browsers = ['Chrome'];
	// }

	config.set(configuration);
};

