'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                               * All rights reserved.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                               * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                               */

var _ReactDomFactory = require('./factories/ReactDomFactory');

var _ReactDomFactory2 = _interopRequireDefault(_ReactDomFactory);

var _Registration = require('./Registration');

var _Registration2 = _interopRequireDefault(_Registration);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a unique id
 * Example 'C22'
 * @returns {string}
 */
var _assignId = function idFactory() {
	var nextId = 0;
	return function _assignId() {
		nextId = nextId + 1;
		return 'C' + nextId;
	};
}();

/**
 * Determine if the object is a Promise
 * @param {*}   obj     - The test object
 * @returns {boolean}   - True if deemed to be a promise
 * @private
 */
var _isPromise = function _isPromise(obj) {
	return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

/**
 * The Container class
 */

var Container = function () {

	/**
 * Constructor
 */
	function Container() {
		var registrations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var factory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ReactDomFactory2.default;

		_classCallCheck(this, Container);

		/**
   * The container id
   * @type {string}
   * @private
   */
		this._id = _assignId();

		/**
   * The containers registrations
   * @type {Object}
   * @private
   */
		this._registrations = registrations;

		/**
   * The containers dom factory
   * @type {ReactDomFactory}
   * @private
   */
		this._factory = factory;
	}

	/**
 * The unique id for this container
 * @returns {*}
 */


	_createClass(Container, [{
		key: 'id',
		value: function id() {
			return this._id;
		}

		/**
  * Register a component in the container
  * @param {string}           key     - A unique component key
  * @param {object|Promise}   comp    - The component or Promise
  * @deprecated
  */

	}, {
		key: 'register',
		value: function register(key, comp) {
			if (typeof key !== 'string') {
				throw new Error('Unexpected component key. Expects a string.', name);
			}

			//Logger.warn('RHW03', 'Direct container registrations are being deprecated. Please use a ContainerBuilder.');

			this._registrations[key] = new _Registration2.default(function () {
				return comp;
			}).as(key);
		}

		/**
  * Register multiple components to the container
  * @param {object}  comps     - The components
  * @deprecated
  */

	}, {
		key: 'registerAll',
		value: function registerAll(comps) {
			var _this = this;

			if ((typeof comps === 'undefined' ? 'undefined' : _typeof(comps)) !== 'object') {
				throw new Error('Unexpected components type. Expects type object', comps);
			}

			//Logger.warn('RHW03', 'Direct container registrations are being deprecated. Please use a ContainerBuilder.');

			Object.keys(comps).forEach(function (key) {
				_this._registrations[key] = new _Registration2.default(function () {
					return comps[key];
				}).as(key);
			});
		}

		/**
   * Gets a registration for a key
   * @param {string}      key          - The registration key
   * @returns {null|Registration}      - Returns registration otherwise null if not found
   * @private
   */

	}, {
		key: '_getRegistration',
		value: function _getRegistration(key) {
			var registration = this._registrations[key];

			if (!registration || !registration.operator) {
				return null;
			}

			return registration;
		}

		/**
   * Resolves the operator for a registration
   * @param {Registration}        registration        - The registration
   * @param {*}                   context             - The context the operator is run in
   * @returns {Promise}
   * @private
   */

	}, {
		key: '_applyOperatorFor',
		value: function _applyOperatorFor(registration, context) {
			var assignedOperator = registration.operator.call(context, this);

			// Wrap in a promise if the component resolved without one
			if (!_isPromise(assignedOperator)) {
				return Promise.resolve(assignedOperator);
			}

			return new Promise(function (resolve, reject) {
				assignedOperator.then(function (o) {

					// Handle any esModule's with default exports
					// This helps developers write cleaner container code otherwise
					// they will need to wrap `import()`'s in Promises that return the default.. yuk
					// https://github.com/webpack/webpack.js.org/pull/213
					var component = o;
					if (o.__esModule && o.default) {
						component = o.default;
					}

					resolve(component);
					return component;
				}).catch(reject);
			});
		}

		/**
  * Resolve a component from the container
  * @param {string}       name        - The unique component key
  * @param {*}           [inContext=undefined]   - The context the operator is run in
  * @returns {Promise}
  */

	}, {
		key: 'resolve',
		value: function resolve(name) {
			var _this2 = this;

			var inContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			return new Promise(function (resolve, reject) {
				var registration = _this2._getRegistration(name);
				if (!registration) {
					reject(new Error('Cannot resolve registration.'));
					return null;
				}

				_this2._applyOperatorFor(registration, inContext).then(resolve).catch(reject);
			});
		}

		/**
   * Resolve a component from the container with its meta data
   * @param {string}      name                    - The unique component key
   * @param {*}           [inContext=undefined]   - The context the operator is run in
   * @returns {Promise}
   */

	}, {
		key: 'resolveWithMeta',
		value: function resolveWithMeta(name) {
			var _this3 = this;

			var inContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			return new Promise(function (resolve, reject) {
				var registration = _this3._getRegistration(name);
				if (!registration) {
					reject(new Error('Cannot resolve registration.'));
					return null;
				}

				_this3._applyOperatorFor(registration, inContext).then(function (o) {
					resolve({
						component: o,
						meta: registration.meta
					});
				}).catch(reject);
			});
		}

		/**
   * The containers factory
   * @returns {ReactDomFactory}
   */

	}, {
		key: 'domFactory',


		/**
  * The containers dom factory
  * @returns {ReactDomFactory}
    @deprecated
  */
		value: function domFactory() {
			return this.factory;
		}
	}, {
		key: 'factory',
		get: function get() {
			return this._factory;
		}
	}]);

	return Container;
}();

exports.default = Container;
module.exports = exports['default'];