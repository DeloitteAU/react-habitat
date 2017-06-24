'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
	}

	/**
  * Register new component
  * @param {function}        operator    - function that returns either a React Component or a Promise that resolves one
  * @returns {Registration}
  */


	_createClass(ContainerBuilder, [{
		key: 'register',
		value: function register(operator) {
			var registration = new _Registration2.default(operator);
			if (this._defaultOptions) {
				registration.withOptions(this._defaultOptions);
			}
			this._registrations.push(registration);
			this._factory = _ReactDomFactory2.default;
			return registration;
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
			return new _Container2.default(this._registrations.reduce(function (acc, registration) {
				if (!registration.key) {
					_Logger2.default.error('RHEXX', 'Missing key for registration.');
					return acc;
				}

				if (acc[registration.key]) {
					_Logger2.default.error('RHEXX', 'Registration for key already exists.', registration.key);
					return acc;
				}

				acc[registration.key] = registration;
				return acc;
			}, {}), this._factory);
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