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

var hasOldAPIWarning = false;
var OLD_API_WARNING = 'Direct container registrations are being deprecated. Please use a ContainerBuilder.';

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
		key: '_getRegistration',


		/**
   * Gets a registration for a key
   * @param {string}      key          - The registration key
   * @returns {null|Registration}      - Returns registration otherwise null if not found
   * @private
   */
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
			var _this = this;

			var inContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			return new Promise(function (resolve, reject) {
				var registration = _this._getRegistration(name);
				if (!registration) {
					reject(new Error('Cannot resolve registration.'));
					return null;
				}

				_this._applyOperatorFor(registration, inContext).then(resolve).catch(reject);
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
			var _this2 = this;

			var inContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			return new Promise(function (resolve, reject) {
				var registration = _this2._getRegistration(name);
				if (!registration) {
					reject(new Error('Cannot resolve registration.'));
					return null;
				}

				_this2._applyOperatorFor(registration, inContext).then(function (o) {
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
		key: 'register',


		//region Deprecated

		/**
   * Register a component in the container
   * @param {string}           key     - A unique component key
   * @param {object|Promise}   comp    - The component or Promise
   * @deprecated
   */
		value: function register(key, comp) {
			if (typeof key !== 'string') {
				throw new Error('Unexpected component key. Expects a string.', name);
			}

			if (!hasOldAPIWarning) {
				hasOldAPIWarning = true;
				_Logger2.default.warn('RHW03', OLD_API_WARNING);
			}

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
			var _this3 = this;

			if ((typeof comps === 'undefined' ? 'undefined' : _typeof(comps)) !== 'object') {
				throw new Error('Unexpected components type. Expects type object', comps);
			}

			if (!hasOldAPIWarning) {
				hasOldAPIWarning = true;
				_Logger2.default.warn('RHW03', OLD_API_WARNING);
			}

			Object.keys(comps).forEach(function (key) {
				_this3._registrations[key] = new _Registration2.default(function () {
					return comps[key];
				}).as(key);
			});
		}

		/**
   * Register a component in the container
   * @param {string}  name    - A unique component key
   * @param {object}  comp    - The component
   * @deprecated
   */

	}, {
		key: 'registerComponent',
		value: function registerComponent(name, comp) {
			if (!hasOldAPIWarning) {
				hasOldAPIWarning = true;
				_Logger2.default.warn('RHW03', OLD_API_WARNING);
			}
			this.register(name, comp);
		}

		/**
   * Register multiple components to the container
   * @param {object}  comps     - The components
   */

	}, {
		key: 'registerComponents',
		value: function registerComponents(comps) {
			if (!hasOldAPIWarning) {
				hasOldAPIWarning = true;
				_Logger2.default.warn('RHW03', OLD_API_WARNING);
			}
			this.registerAll(comps);
		}

		/**
   * Gets a component for key
   * @param name
   * @returns {Object}
   * @deprecated
   */

	}, {
		key: 'getComponent',
		value: function getComponent(name) {
			_Logger2.default.warn('RHW03', 'getComponent is being deprecated. Please use "resolve" instead.');
			return this.resolve(name);
		}

		/**
   * The containers dom factory
   * @returns {ReactDomFactory}
   @deprecated
   */

	}, {
		key: 'domFactory',
		value: function domFactory() {
			_Logger2.default.warn('RHW03', 'domFactory() is being deprecated. Please use `factory`.');
			return this.factory;
		}

		//endregion

	}, {
		key: 'id',
		get: function get() {
			return this._id;
		}
	}, {
		key: 'factory',
		get: function get() {
			return this._factory;
		}

		/**
   * Returns the number of registrations in the container
   */

	}, {
		key: 'length',
		get: function get() {
			return Object.keys(this._registrations).length;
		}
	}]);

	return Container;
}();

exports.default = Container;
module.exports = exports['default'];