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

var _ReactDomFactory = require('./factories/ReactDomFactory');

var _ReactDomFactory2 = _interopRequireDefault(_ReactDomFactory);

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