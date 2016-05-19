module.exports = function(config) {
    config.set({

        browsers: ['Chrome'],

        // frameworks to use
        frameworks: ['jasmine'],

        preprocessors: {
            '**/*.ts': ['webpack']
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        files: ['tests/**/*.spec.ts'],

        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: false, // (optional) Generates corresponding .map file.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                removeComments: true, // (optional) Do not emit comments to output.
                concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
            },

            // transforming the filenames
            transformPath: function(path) {
                return path.replace(/\.ts$/, '.js');
            }
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration

            resolve: {
                // Add `.ts` and `.tsx` as a resolvable extension.
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
            },

            module: {
                loaders: [
                    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                    { test: /\.tsx?$/, loader: 'ts-loader' }
                ]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        plugins: [
            "karma-jasmine",
            "karma-webpack",
            "karma-chrome-launcher"
        ]
    });
};