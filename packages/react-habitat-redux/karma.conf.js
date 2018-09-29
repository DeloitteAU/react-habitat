module.exports = function(config) {
	const configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		polyfill: ['Promise', 'Object.assign'],

		// list of files / patterns to load in the browser
		files: [
			'tests/**/*.spec.js'
		],

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome', 'Firefox'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

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
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	};

	if (process.env.TRAVIS) {
	 	configuration.browsers = ['Firefox'];
	}

	config.set(configuration);
};

