'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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
		var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ReactDomFactory2.default;
		var registrations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
		this._registrations = registrations || {};

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
		key: 'resolve',


		/**
  * Resolve a component from the container
  * @param {string}       key                     - The unique component key
  * @returns {object}                             - Component with meta
  */
		value: function resolve(key) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				var registration = _this._registrations[key];

				if (!registration || !registration.operator) {
					reject(new Error('Cannot resolve registration.'));
					return null;
				}

				registration.operator().then(function (o) {
					// Handle any esModule's with default exports
					// This helps developers write cleaner container code otherwise
					// they will need to wrap `import()`'s in Promises that return the default..
					// https://github.com/webpack/webpack.js.org/pull/213
					var component = o;
					if (o.__esModule && o.default) {
						component = o.default;
					}

					resolve({
						component: component,
						meta: registration.meta
					});
					return component;
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

			this._registrations[key] = new _Registration2.default(comp).as(key);
		}

		/**
   * Register multiple components to the container
   * @param {object}  comps     - The components
   * @deprecated
   */

	}, {
		key: 'registerAll',
		value: function registerAll(comps) {
			var _this2 = this;

			if ((typeof comps === 'undefined' ? 'undefined' : _typeof(comps)) !== 'object') {
				throw new Error('Unexpected components type. Expects type object', comps);
			}

			if (!hasOldAPIWarning) {
				hasOldAPIWarning = true;
				_Logger2.default.warn('RHW03', OLD_API_WARNING);
			}

			Object.keys(comps).forEach(function (key) {
				_this2._registrations[key] = new _Registration2.default(comps[key]).as(key);
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