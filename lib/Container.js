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

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a unique id
 * Example 'C22'
 * @returns {string}
 */
var assignId = function idFactory() {
	var _nextId = 0;

	return function _assignId() {
		_nextId++;
		return 'C' + _nextId;
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
		_classCallCheck(this, Container);

		this._components = {};
		this._id = assignId();
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
  * @param {string}  name    - A unique component key
  * @param {object}  comp    - The component
  */

	}, {
		key: 'register',
		value: function register(name, comp) {
			if (typeof name !== 'string') {
				throw new Error('Unexpected component key. Expects a string.', name);
			}
			this._components[name] = comp;
		}

		/**
  * Register multiple components to the container
  * @param {object}  comps     - The components
  */

	}, {
		key: 'registerAll',
		value: function registerAll(comps) {
			if ((typeof comps === 'undefined' ? 'undefined' : _typeof(comps)) !== 'object') {
				throw new Error('Unexpected components type. Expects type object', comps);
			}

			Object.assign(this._components, comps);
		}

		/**
  * Resolve a component from the container
  * @param {string}    name    - The unique component key
  * @returns {object}
  */

	}, {
		key: 'resolve',
		value: function resolve(name) {
			return this._components[name];
		}

		/**
  * Returns the containers dom factory
  * @returns {ReactDomFactory}
  */

	}, {
		key: 'domFactory',
		value: function domFactory() {
			return _ReactDomFactory2.default;
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
			_Logger2.default.warn('RHW03', 'registerComponent is being deprecated. Please use "register" instead.');
			this.register(name, comp);
		}

		/**
  * Register multiple components to the container
  * @param {object}  comps     - The components
  */

	}, {
		key: 'registerComponents',
		value: function registerComponents(comps) {
			_Logger2.default.warn('RHW03', 'registerComponents is being deprecated. Please use "registerAll" instead.');
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
	}]);

	return Container;
}();

exports.default = Container;
module.exports = exports['default'];