(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactHabitat"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactHabitat"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Bootstrapper = __webpack_require__(2);

	var _Bootstrapper2 = _interopRequireDefault(_Bootstrapper);

	var _Container = __webpack_require__(3);

	var _Container2 = _interopRequireDefault(_Container);

	var _ContainerBuilder = __webpack_require__(4);

	var _ContainerBuilder2 = _interopRequireDefault(_ContainerBuilder);

	var _createBootstrapper = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		Bootstrapper: _Bootstrapper2.default,
		Container: _Container2.default,
		ContainerBuilder: _ContainerBuilder2.default,
		createBootstrapper: _createBootstrapper.createBootstrapper
	};
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2016-present, Deloitte Digital.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-3-Clause license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var empty = function empty() {};
	var log = empty;
	var concatArgs = empty;
	var WARN_DEFINITIONS_URL = 'http://tinyurl.com/jxryd3s';

	// If not production update the stubs
	if (true) {

		/**
	 * Safely log to the console
	 */
		log = function log(type, args) {
			if (typeof console !== 'undefined' && console[type]) {
				if (console[type].apply) {
					console[type].apply(undefined, args);
				} else {
					// IE9 Fallback
					console[type](args);
				}
			}
		};

		/**
	  * Concats the message and arguments into a single array
	  */
		concatArgs = function concatArgs(msg, args) {
			var throwArgs = [msg];

			if (args && args.length) {
				for (var i = 0; i < args.length; i++) {
					throwArgs.push(args[i]);
				}
			}

			return throwArgs;
		};
	}

	/**
	 * Logger class for debugging React Habitat
	 */

	var Logger = function () {
		function Logger() {
			_classCallCheck(this, Logger);
		}

		_createClass(Logger, null, [{
			key: 'warn',


			/**
	   * Log a warning
	   * @param {string}  code    - The warning code
	   * @param {string}  msg     - The warning message
	   * @param {Array}	debugs	- Any debugging arguments
	   */
			value: function warn(code, msg) {
				for (var _len = arguments.length, debugs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					debugs[_key - 2] = arguments[_key];
				}

				var args = concatArgs('WARNING: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase(), debugs);
				log('warn', args);
			}

			/**
	   * Log an error
	   * @param {string}  code    - The warning code
	   * @param {string}  msg     - The error message
	   * @param {Array}	debugs	- Any debugging arguments
	   */

		}, {
			key: 'error',
			value: function error(code, msg) {
				for (var _len2 = arguments.length, debugs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					debugs[_key2 - 2] = arguments[_key2];
				}

				var args = concatArgs('ERROR: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase(), debugs);
				log('error', args);
			}
		}]);

		return Logger;
	}();

	exports.default = Logger;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _Habitat = __webpack_require__(6);

	var _Habitat2 = _interopRequireDefault(_Habitat);

	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_HABITAT_SELECTOR = 'data-component';

	/**
	 * Safe callback wrapper
	 * @param {null|function}		cb			- The callback
	 * @param {object}				context		- The context of the callback
	 * @param {...object}			args		- Arguments to apply
	 * @private
	 */
	function _callback(cb, context) {
		if (typeof cb === 'function') {
			for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				args[_key - 2] = arguments[_key];
			}

			cb.call.apply(cb, [context].concat(args));
		}
	}

	/**
	 *  Bootstrapper class
	 */

	var Bootstrapper = function () {

		/**
	  * Constructor
	  */
		function Bootstrapper() {
			_classCallCheck(this, Bootstrapper);

			// Sanity check
			if (!window || !window && !window.document) {
				throw new Error('React Habitat requires a window but cannot see one :(');
			}

			/**
	   * The DOM component selector
	   * @type {string}
	   */
			this.componentSelector = DEFAULT_HABITAT_SELECTOR;

			/**
	   * The container
	   * Slashes to avoid super collisions
	   * @type {Container|null}
	   * @private
	   */
			this.__container__ = null;
		}

		/**
	  * Apply the container to nodes
	  * @param {array}		nodes				- The elements to parse
	  * @param {function}	[cb=null]			- Optional callback
	  * @private
	  */


		_createClass(Bootstrapper, [{
			key: '_apply',
			value: function _apply(nodes) {
				var _this = this;

				var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				// const factory = container.domFactory();
				// const id = container.id();
				var resolveQueue = [];

				// Iterate over component elements in the dom

				var _loop = function _loop(i) {
					var ele = nodes[i];

					// Ignore elements that have already been connected
					if (_Habitat2.default.hasHabitat(ele)) {
						return 'continue';
					}

					// Resolve components using promises
					var componentName = ele.getAttribute(_this.componentSelector);
					resolveQueue.push(_this.__container__.resolve(componentName, _this).then(function (registration) {
						// This is an expensive operation so only do on non prod builds
						if (true) {
							if (ele.querySelector('[' + _this.componentSelector + ']')) {
								_Logger2.default.warn('RHW08', 'Component should not contain any nested components.', ele);
							}
						}

						// Generate props
						var props = _Habitat2.default.parseProps(ele);
						if (registration.meta.defaultProps) {
							props = Object.assign({}, registration.meta.defaultProps, props);
						}

						// Options
						var options = registration.meta.options || {};

						// Inject the component
						_this.__container__.factory.inject(registration.component, props, _Habitat2.default.create(ele, _this.__container__.id, options));
					}).catch(function (err) {
						_Logger2.default.error('RHW01', 'Cannot resolve component "' + componentName + '" for element.', err, ele);
					}));
				};

				for (var i = 0; i < nodes.length; ++i) {
					var _ret = _loop(i);

					if (_ret === 'continue') continue;
				}

				// Trigger callback when all promises are finished
				// regardless if some fail
				Promise.all(resolveQueue.map(function (p) {
					return p.catch(function (e) {
						return e;
					});
				})).then(function () {
					_callback(cb);
				}).catch(function (err) {
					// We should never get here.. if we do this is a bug
					throw err;
				});
			}

			/**
	   * Set the container
	   * @param {object}    container   - The container
	   * @param {function}  [cb=null]   - Optional callback
	   */

		}, {
			key: 'setContainer',
			value: function setContainer(container) {
				var _this2 = this;

				var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (this.__container__ !== null) {
					_Logger2.default.error('RHW02', 'A container is already set. ' + 'Please call dispose() before assigning a new one.');
					return;
				}

				if (!container.factory || typeof container.factory.inject !== 'function' || typeof container.factory.dispose !== 'function') {
					_Logger2.default.error('RHE10', 'Incompatible factory');
					return;
				}

				// Set the container
				this.__container__ = container;

				// Wire up the components from the container
				this.update(null, function () {
					_callback(cb, _this2);
				});
			}

			/**
	   * The container
	   * @returns {Container}
	   */

		}, {
			key: 'update',


			/**
	  * Apply the container to an updated dom structure
	  * @param {node}		node		- Target node to parse or null for entire document body
	  * @param {function}		[cb=null]	- Optional callback
	  */
			value: function update(node) {
				var _this3 = this;

				var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				// Check if we have a container before attempting an update
				if (!this.__container__) {
					_callback(cb);
					return;
				}

				var target = node || window.document.body;
				var query = target.querySelectorAll('[' + this.componentSelector + ']');

				if (!query.length) {
					// Nothing to update
					return;
				}

				// Lifecycle event
				// Hook to allow developers to cancel operation
				if (typeof this.shouldUpdate === 'function') {
					if (this.shouldUpdate(target, query) === false) {
						_callback(cb, this);
						return;
					}
				}

				// Lifecycle event
				if (typeof this.willUpdate === 'function') {
					this.willUpdate(target, query);
				}

				this._apply(query, function () {
					// Lifecycle event
					if (typeof _this3.didUpdate === 'function') {
						_this3.didUpdate(target);
					}

					_callback(cb, _this3);
				});
			}

			/**
	   * Unmount all habitat instances for the container
	   * @param {function}	[cb=null]	- Optional callback
	   */

		}, {
			key: 'unmountHabitats',
			value: function unmountHabitats() {
				var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


				// Lifecycle event
				if (typeof this.willUnmountHabitats === 'function') {
					this.willUnmountHabitats();
				}

				// Get open habitats for this container
				var habitats = _Habitat2.default.listHabitats(this.__container__.id);

				// Clean up
				for (var i = 0; i < habitats.length; ++i) {
					this.__container__.factory.dispose(habitats[i]);
					_Habitat2.default.destroy(habitats[i]);
				}

				// Lifecycle event
				if (typeof this.didUnmountHabitats === 'function') {
					this.didUnmountHabitats();
				}

				// Handle callback
				_callback(cb, this);
			}

			/**
	   * Dispose the container and destroy habitat instances
	   * @param {function}	[cb=null]	- Optional callback
	   */

		}, {
			key: 'dispose',
			value: function dispose() {
				var _this4 = this;

				var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.unmountHabitats(function () {
					// Reset and release
					_this4.__container__ = null;

					// Lifecycle event
					if (typeof _this4.didDispose === 'function') {
						_this4.didDispose();
					}

					// Handle callback
					_callback(cb, _this4);
				});
			}
		}, {
			key: 'container',
			get: function get() {
				return this.__container__;
			}
		}]);

		return Bootstrapper;
	}();

	exports.default = Bootstrapper;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _ReactDomFactory = __webpack_require__(5);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	var _Registration = __webpack_require__(7);

	var _Registration2 = _interopRequireDefault(_Registration);

	var _Container = __webpack_require__(3);

	var _Container2 = _interopRequireDefault(_Container);

	var _ReactDomFactory = __webpack_require__(5);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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


	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ReactDomFactory = function () {
		function ReactDomFactory() {
			_classCallCheck(this, ReactDomFactory);
		}

		_createClass(ReactDomFactory, null, [{
			key: 'inject',


			/**
	  * Injects a react component
	  * @param {object}			module		- The react component
	  * @param {object}			props		- Props to initiate component with
	  * @param {HTMLElement}		target		- The target element to inject to
	  */
			value: function inject(module) {
				var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var target = arguments[2];

				if (target) {
					_reactDom2.default.render(_react2.default.createElement(module, props || {}), target);
				} else {
					_Logger2.default.warn('RHW07', 'Target element is null or undefined.');
				}
			}

			/**
	   *  Disposes a react component
	   * @param {HTMLElement}		target		- The target element to dispose
	   */

		}, {
			key: 'dispose',
			value: function dispose(target) {
				if (target) {
					_reactDom2.default.unmountComponentAtNode(target);
				}
			}
		}]);

		return ReactDomFactory;
	}();

	exports.default = ReactDomFactory;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.HABITAT_PROP_REF = exports.HABITAT_PROP_NUMBER = exports.HABITAT_PROP_JSON = exports.HABITAT_PROP = exports.ACTIVE_HABITAT_FLAG = exports.HABITAT_NAMESPACE = exports.HABITAT_HOST_KEY = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HABITAT_HOST_KEY = exports.HABITAT_HOST_KEY = 'habitatHostElement';
	var HABITAT_NAMESPACE = exports.HABITAT_NAMESPACE = 'data-habitat';
	var ACTIVE_HABITAT_FLAG = exports.ACTIVE_HABITAT_FLAG = 'data-has-habitat';
	var HABITAT_PROP = exports.HABITAT_PROP = 'data-prop-';
	var HABITAT_PROP_JSON = exports.HABITAT_PROP_JSON = 'data-props';
	var HABITAT_PROP_NUMBER = exports.HABITAT_PROP_NUMBER = 'data-n-prop-';
	var HABITAT_PROP_REF = exports.HABITAT_PROP_REF = 'data-r-prop-';

	var hasExpandoWarning = false;

	/**
	 * Determine an elements computed display style
	 * @private
	 * @param {HTMLElement}		ele		- The element to test
	 * @returns {string}				- Returns 'block' or 'inline'
	 */
	function getDisplayType(ele) {
		var cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
		return cStyle.display;
	}

	/**
	 * Converts the first letter of a string to uppercase
	 * @private
	 * @param {string}		input		- The string to parse
	 * @returns {string}				- Returns the parsed string
	 */
	function firstLetterToUpper(input) {
		return input[1].toUpperCase();
	}

	/**
	 * Converts a habitat hyphenated attribute name into camelCase
	 * @param {string}		key			- The habitat pre attr
	 * @param {string}		name		- The attribute name
	 * @returns {string}				- The camel case value
	 */
	function getNameFor(key, name) {
		return name.replace(key, '').replace(/-([a-z])/g, firstLetterToUpper);
	}

	/**
	 * The Habitat provider class
	 */

	var Habitat = function () {
		function Habitat() {
			_classCallCheck(this, Habitat);
		}

		_createClass(Habitat, null, [{
			key: 'parseProps',


			/**
	   * Returns a dictionary of properties and values defined on an element
	   */
			value: function parseProps(ele) {
				// Default props with reference to the initiating node
				var props = {
					proxy: ele // Pass in a reference to the original node
				};

				// Populate custom props from reading any ele attributes that start with 'data-prop-'
				for (var i = 0; i < ele.attributes.length; i++) {
					var a = ele.attributes[i];

					if (a.name.indexOf(HABITAT_PROP) === 0) {
						// Convert prop name from hyphens to camel case
						var name = getNameFor(HABITAT_PROP, a.name);

						var value = a.value || '';

						// Parse booleans
						if (typeof value === 'string' && value.toLowerCase() === 'false') {
							value = false;
						}
						if (typeof value === 'string' && value.toLowerCase() === 'true') {
							value = true;
						}

						// Parse json strings
						if (typeof value === 'string' && value.length >= 2 && (value[0] === '{' && value[value.length - 1] === '}' || value[0] === '[' && value[value.length - 1] === ']')) {
							value = JSON.parse(value);
						}

						// Parse nulls
						if (typeof value === 'string' && value.toLowerCase() === 'null') {
							value = null;
						}

						props[name] = value;
					} else

						// JSON type props
						if (a.name === HABITAT_PROP_JSON) {
							// Parse all of the props as json
							Object.assign(props, JSON.parse(a.value));
						} else

							// Number type props
							if (a.name.indexOf('data-n-prop-') === 0) {

								// Convert prop name from hyphens to camel case
								var _name = getNameFor(HABITAT_PROP_NUMBER, a.name);

								// Parse the value as a float as it handles both floats and whole int's
								// Might want to look at configuring the radix somehow in the future
								props[_name] = parseFloat(a.value);
							} else

								// Reference type props
								if (window && a.name.indexOf(HABITAT_PROP_REF) === 0) {

									// Convert prop name from hyphens to camel case
									var _name2 = getNameFor(HABITAT_PROP_REF, a.name);

									// Set the reference to the global object
									props[_name2] = window[a.value];
								}
				}

				return props;
			}

			/**
	  * Creates a new habitat in the dom
	  * @param {HTMLElement}  ele                         - The element
	  * @param {string}       id                          - The container id
	  * @param {object}       options                     - The habitat default options
	  * @param {string}       [options.tag]               - The tag to use eg 'span'
	  * @param {string}       [options.className]         - The habitats class name
	  * @param {boolean}      [options.replaceDisabled]   - If true, the original node will be left in the dom
	  * @returns {Element}
	  */

		}, {
			key: 'create',
			value: function create(ele, id) {
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


				if (window.document.body === ele || ele === null || ele === undefined) {
					_Logger2.default.warn('RHW04', 'Cannot open a habitat for element.', ele);
					return null;
				}

				var tag = ele.getAttribute('data-habitat-tag') || options.tag || null;

				if (!tag) {
					tag = 'span';
					// If tag is a block level element, then replicate it with the portal
					if (getDisplayType(ele) === 'block') {
						tag = 'div';
					}
				}

				var habitat = window.document.createElement(tag);
				var className = ele.getAttribute('data-habitat-class') || options.className || null;

				var replaceDisabled = typeof options.replaceDisabled === 'boolean' ? options.replaceDisabled : false;
				if (ele.getAttribute('data-habitat-no-replace') !== null) {
					replaceDisabled = ele.getAttribute('data-habitat-no-replace').toLocaleLowerCase() === 'true';
				}

				// Keep references to habitats container id's
				habitat.setAttribute(HABITAT_NAMESPACE, id);

				// Set habitat class name if any
				if (className) {
					habitat.className = '' + className;
				}

				// inject habitat
				ele.parentNode.insertBefore(habitat, ele.nextSibling);

				// Determine if we should keep host element in the dom
				if (ele.tagName !== 'INPUT') {

					// Not an input so assumed we don't need to keep the target
					// element around

					if (!replaceDisabled) {
						// Detach it
						var host = ele.parentNode.removeChild(ele);

						// But try to keep a reference to the host in-case destroy is ever called
						// and we need to reinstate it back to how we found it

						try {
							// It might be better if we keep references in a weak map, need to look
							// at this in the future
							habitat[HABITAT_HOST_KEY] = host;
						} catch (e) {
							if (hasExpandoWarning) {
								// Expando is off
								_Logger2.default.warn('RHW06', 'Arbitrary properties are disabled.' + ' The container may not dispose correctly.', e);
								hasExpandoWarning = true;
							}
						}
					}
				} else {
					// The element is an input, leave it in the
					// dom to allow passing data back to the backend again
					// Set a flag so we know its been proccessed
					ele.setAttribute(ACTIVE_HABITAT_FLAG, 'true');

					// Set display none however if the input is not a hidden input
					// TODO: Investigate what this does to accessibility
					if (ele.getAttribute('type') !== 'hidden') {
						ele.setAttribute('style', 'display: none;');
					}
				}

				return habitat;
			}

			/**
	   * Checks if an element has a habitat
	   */

		}, {
			key: 'hasHabitat',
			value: function hasHabitat(ele) {
				return ele.getAttribute(ACTIVE_HABITAT_FLAG) !== null;
			}

			/**
	  * Destroys a habitat
	  * @param ele
	  */

		}, {
			key: 'destroy',
			value: function destroy(ele) {

				// Attempt to reinstate any host objects
				try {
					if (typeof ele[HABITAT_HOST_KEY] !== 'undefined') {
						// Put back any hosts that where removed
						ele.parentNode.insertBefore(ele[HABITAT_HOST_KEY], ele);
					}
				} finally {
					// Remove the habitat element
					ele.parentNode.removeChild(ele);
				}
			}

			/**
	   * Lists habitats for id
	   * @param {string}      id      - The id
	   * @returns {NodeList}
	   */

		}, {
			key: 'listHabitats',
			value: function listHabitats(id) {
				return window.document.body.querySelectorAll('[' + HABITAT_NAMESPACE + '="' + id + '"]');
			}
		}]);

		return Habitat;
	}();

	exports.default = Habitat;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Registration
	 */
	var Registration = function () {
		function Registration(operator) {
			_classCallCheck(this, Registration);

			/**
	   * Operator reference
	   * @type {function}
	   * @private
	   */
			this._operator = operator;

			/**
	   * The registration key
	   * @type {string}
	   * @private
	   */
			this._key = null;

			/**
	   * Registration meta data
	   * @type {object}
	   * @private
	   */
			this._meta = {};
		}

		/**
	  * The registration operator
	  * @returns {Function}
	  */


		_createClass(Registration, [{
			key: 'as',


			/**
	   * Set the registration key, must be unique
	   * @param {string}  key     - The key
	   * @returns {Registration}
	   */
			value: function as(key) {
				if (typeof key !== 'string') {
					_Logger2.default.error('RHE13', 'Unexpected key type. Expected a string.', key);
					return;
				}
				this._key = key;

				return this;
			}

			/**
	   * Set the registration default props
	   * @param {object}      props       - The default props
	   * @returns {Registration}
	   */

		}, {
			key: 'withDefaultProps',
			value: function withDefaultProps(props) {
				this._meta.defaultProps = props;
				return this;
			}

			/**
	   * Set the habitat options
	   * @param {object}      options                     - The habitat options
	   * @param {string}      [options.tag]               - The tag to use eg 'span'
	   * @param {string}      [options.className]         - The habitats class name
	   * @param {boolean}     [options.replaceDisabled]   - If true, the original node will be left in the dom
	   * @returns {Registration}
	   */

		}, {
			key: 'withOptions',
			value: function withOptions(options) {
				this._meta.options = options;
				return this;
			}
		}, {
			key: 'operator',
			get: function get() {
				return this._operator;
			}

			/**
	   * The registration key
	   * @returns {string|*}
	   */

		}, {
			key: 'key',
			get: function get() {
				return this._key;
			}

			/**
	   * The registration meta data
	   * @returns {Object}
	   */

		}, {
			key: 'meta',
			get: function get() {
				return this._meta;
			}
		}]);

		return Registration;
	}();

	exports.default = Registration;
	module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports._Mixin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.createBootstrapper = createBootstrapper;

	var _Bootstrapper2 = __webpack_require__(2);

	var _Bootstrapper3 = _interopRequireDefault(_Bootstrapper2);

	var _ContainerBuilder = __webpack_require__(4);

	var _ContainerBuilder2 = _interopRequireDefault(_ContainerBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Deloitte Digital.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-3-Clause license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/*
	* Mixin class used for extending the classic spec
	* @private
	*/
	var _Mixin = exports._Mixin = function (_Bootstrapper) {
		_inherits(_Mixin, _Bootstrapper);

		/*
	 * A Constructor that takes a spec
	 */
		function _Mixin(spec, callback) {
			_classCallCheck(this, _Mixin);

			// Check if a container spec was supplied
			var _this = _possibleConstructorReturn(this, (_Mixin.__proto__ || Object.getPrototypeOf(_Mixin)).call(this));

			if (!spec.container) {
				console.warn('"Container" property was not supplied');
				return _possibleConstructorReturn(_this);
			}

			// Set the component selector if defined
			if (spec.componentSelector) {
				_this.componentSelector = spec.componentSelector;
			}

			// Set the watcher value if defined
			if (typeof spec.enableWatcher === 'boolean') {
				_this.enableWatcher = spec.enableWatcher;
			}

			// Create a new container
			var containerBuilder = new _ContainerBuilder2.default(spec.defaultOptions || null);

			// Map the components
			for (var i = 0; i < spec.container.length; i++) {
				var registration = void 0;
				if (spec.container[i].forAsync) {
					registration = containerBuilder.registerAsync(spec.container[i].forAsync).as(spec.container[i].register);
				} else {
					registration = containerBuilder.register(spec.container[i].for).as(spec.container[i].register);
				}

				if (spec.container[i].withDefaultProps) {
					registration.withDefaultProps(spec.container[i].withDefaultProps);
				}

				if (spec.container[i].withOptions) {
					registration.withOptions(spec.container[i].withOptions);
				}
			}

			_this._shouldUpdateProxy = spec.shouldUpdate || null;
			_this._willUpdateProxy = spec.willUpdate || null;
			_this._didUpdateProxy = spec.didUpdate || null;
			_this._willUnmountProxy = spec.willUnmountHabitats || null;
			_this._didUnmountProxy = spec.didUnmountHabitats || null;
			_this._didDisposeProxy = spec.didDispose || null;

			// Finally, set the container
			_this.setContainer(containerBuilder.build(), function () {
				if (typeof callback === 'function') {
					callback();
				}
			});
			return _this;
		}

		_createClass(_Mixin, [{
			key: 'shouldUpdate',
			value: function shouldUpdate(node) {
				if (this._shouldUpdateProxy) {
					this._shouldUpdateProxy(node);
				}
			}
		}, {
			key: 'willUpdate',
			value: function willUpdate() {
				if (this._willUpdateProxy) {
					this._willUpdateProxy();
				}
			}
		}, {
			key: 'didUpdate',
			value: function didUpdate() {
				if (this._didUpdateProxy) {
					this._didUpdateProxy();
				}
			}
		}, {
			key: 'willUnmountHabitats',
			value: function willUnmountHabitats() {
				if (this._willUnmountProxy) {
					this._willUnmountProxy();
				}
			}
		}, {
			key: 'didUnmountHabitats',
			value: function didUnmountHabitats() {
				if (this._didUnmountProxy) {
					this._didUnmountProxy();
				}
			}
		}, {
			key: 'didDispose',
			value: function didDispose() {
				if (this._didDisposeProxy) {
					this._didDisposeProxy();
				}
			}
		}]);

		return _Mixin;
	}(_Bootstrapper3.default);

	/*
	* The classic bootstrapper
	*/


	function createBootstrapper(spec) {
		var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		return new _Mixin(spec, cb);
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ })
/******/ ])
});
;