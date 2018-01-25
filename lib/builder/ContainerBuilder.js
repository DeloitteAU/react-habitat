'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Logger = require('../Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Registration = require('../Registration');

var _Registration2 = _interopRequireDefault(_Registration);

var _Container = require('../Container');

var _Container2 = _interopRequireDefault(_Container);

var _ReactDomFactory = require('../factories/ReactDomFactory');

var _ReactDomFactory2 = _interopRequireDefault(_ReactDomFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContainerBuilder = function () {
	function ContainerBuilder() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		_classCallCheck(this, ContainerBuilder);

		this._registrations = [];
		this._defaultOptions = options;
		this._factory = _ReactDomFactory2.default;
	}

	/**
  * Register new component asynchronously
  * @param {Function}        operator    - function that returns a promise that resolves a React Component
  * @returns {Registration}
  */


	_createClass(ContainerBuilder, [{
		key: 'registerAsync',
		value: function registerAsync(operator) {
			var registration = new _Registration2.default(operator);
			if (this._defaultOptions) {
				registration.withOptions(this._defaultOptions);
			}
			this._registrations.push(registration);
			return registration;
		}

		/**
   * Register new component
   * @param {object}        component    - a React Component to register
   * @returns {Registration}
   */

	}, {
		key: 'register',
		value: function register(component) {
			return this.registerAsync(function () {
				return Promise.resolve(component);
			});
		}

		/**
   * Set the container factory
   * @param {Object}  factory - The factory
   */

	}, {
		key: 'build',


		/**
   * Build the container
   * @returns {Container}
   */
		value: function build() {
			return new _Container2.default(this._factory, this._registrations.reduce(function (acc, registration) {
				if (!registration.key) {
					_Logger2.default.error('RHE11', 'Missing key for registration.');
					return acc;
				}

				if (acc[registration.key]) {
					_Logger2.default.warn('RHW12', 'Duplicate key', registration.key);
				}

				acc[registration.key] = registration;
				return acc;
			}, {}));
		}
	}, {
		key: 'factory',
		set: function set(factory) {
			this._factory = factory;
		}
	}]);

	return ContainerBuilder;
}();

exports.default = ContainerBuilder;
module.exports = exports['default'];