(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactHabitat"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactHabitat"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _createBootstrapper = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		Bootstrapper: _Bootstrapper2.default,
		Container: _Container2.default,
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

			if (args && args.length > 2) {
				for (var i = 2; i < args.length; i++) {
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

				var args = concatArgs.apply(undefined, ['WARNING: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase()].concat(debugs));
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

				var args = concatArgs.apply(undefined, ['ERROR: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase()].concat(debugs));
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

	var _Habitat = __webpack_require__(4);

	var _Habitat2 = _interopRequireDefault(_Habitat);

	var _Logger = __webpack_require__(1);

	var _Logger2 = _interopRequireDefault(_Logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_HABITAT_SELECTOR = 'data-component';

	/**
	 * Safe callback wrapper
	 * @param {null|function}		cb			- The callback
	 * @private
	 */
	function _callback(cb) {
		if (typeof cb === 'function') {
			cb();
		}
	}

	/**
	 * Apply a container to nodes and populate components
	 * @param {array}     container             The container
	 * @param {array}     nodes              	The elements to parse
	 * @param {string}    componentSelector     The component selector
	 * @param {function}  [cb=null]   			- Optional callback
	 * @private
	 */
	function _applyContainer(container, nodes, componentSelector) {
		var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


		// Bail out early if no elements to parse
		if (!nodes || !nodes.length) {
			_callback(cb);
			return;
		}

		var factory = container.domFactory();
		var id = container.id();

		// Iterate over component elements in the dom
		for (var i = 0; i < nodes.length; ++i) {
			var ele = nodes[i];

			// Ignore elements that have already been connected
			if (_Habitat2.default.hasHabitat(ele)) {
				continue;
			}

			var componentName = ele.getAttribute(componentSelector);
			var component = container.resolve(componentName);
			if (component) {
				// Expensive operation, only do on non prod builds
				if (true) {
					if (ele.querySelector('[' + componentSelector + ']')) {
						_Logger2.default.warn('RHW08', 'Component should not contain any nested components.', ele);
					}
				}

				// Inject the component
				factory.inject(component, _Habitat2.default.parseProps(ele), _Habitat2.default.create(ele, id));
			} else {
				_Logger2.default.error('RHW01', 'Cannot resolve component "' + componentName + '" for element.', ele);
			}
		}

		_callback(cb);
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
	   * If true, the container will be applied to dom mutations automatically. True by default.
	   * i.e update(*addedNodes*)
	   * @type {boolean}
	   */
			this.enableWatcher = true;

			/**
	   * The container
	   * @type {Container|null}
	   * @private
	   */
			this._container = null;

			/**
	   * The watcher's observer instance or null
	   * @type {MutationObserver|null}
	   * @private
	   */
			this._observer = null;
		}

		/**
	  * Set the container
	  * @param {object}    container   - The container
	  * @param {function}  [cb=null]   - Optional callback
	  */


		_createClass(Bootstrapper, [{
			key: 'setContainer',
			value: function setContainer(container) {
				var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


				if (this._container !== null) {
					_Logger2.default.error('RHW02', 'A container is already set. ' + 'Please call dispose() before assigning a new one.');
					return;
				}

				// Set the container
				this._container = container;

				// Wire up the components from the container
				this.update(null, function () {
					_callback(cb);
				});
			}

			/**
	  * Apply the container to an updated dom structure
	  * @param {node}		node		- Target node to parse or null for entire document body
	  * @param {function}		[cb=null]	- Optional callback
	  */

		}, {
			key: 'update',
			value: function update(node) {
				var _this = this;

				var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				// Check if we have a container before attempting an update
				if (!this._container) {
					_callback(cb);
					return;
				}

				_callback(this.domWillUpdate);

				// Temporarily stop the watcher from triggering due to Habitat injections
				// Note: This could possibly miss some dom changes during parse time.. bug maybe?
				this.stopWatcher();

				_applyContainer(this._container, node || window.document.body.querySelectorAll('[' + this.componentSelector + ']'), this.componentSelector, function () {
					// Restart the dom watcher unless disabled
					if (_this.enableWatcher) {
						_this.startWatcher();
					}

					_callback(cb);
					_callback(_this.domDidUpdate);
				});
			}

			/**
	   * Start DOM watcher for auto wire ups
	   */

		}, {
			key: 'startWatcher',
			value: function startWatcher() {
				// If disabled, do nothing
				if (!this.enableWatcher) {
					return;
				}

				// Feature available?
				if (typeof MutationObserver === 'undefined') {
					_Logger2.default.warn('RHWXX', 'MutationObserver not available');

					// Auto disable it so it dosnt attempt to start again
					this.enableWatcher = false;
					return;
				}

				// Create observer if not assigned already
				if (!this._observer) {
					this._observer = new MutationObserver(this._handleDomMutation.bind(this));
				}

				// Start observing for dom changes filtered by our component selector
				this._observer.observe(window.document.body, {
					childList: true,
					attributes: true,
					subtree: true,
					attributeOldValue: false,
					characterData: false,
					characterDataOldValue: false,
					attributeFilter: [this.componentSelector]
				});
			}

			/**
	   * Stop the DOM watcher if running
	   */

		}, {
			key: 'stopWatcher',
			value: function stopWatcher() {
				if (this._observer && this._observer.disconnect) {
					this._observer.disconnect();
				}
			}

			/**
	  * Handle dom mutation event
	  * @param {MutationRecord}		mutationRecord		- The mutation record
	  */

		}, {
			key: '_handleDomMutation',
			value: function _handleDomMutation(mutationRecord) {
				if (typeof mutationRecord !== 'undefined') {
					// Only run update if nodes have been added
					var diff = mutationRecord.filter(function (r) {
						return r.addedNodes.length;
					});
					if (diff.length) {
						this.update();
					}
				} else {
					// Fallback
					this.update();
				}
			}

			/**
	   * Dispose the container and destroy habitat instances
	   * @param {function}	[cb=null]	- Optional callback
	   */

		}, {
			key: 'dispose',
			value: function dispose() {
				var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


				// Stop dom watcher if any
				this.stopWatcher();

				// get the container's factory
				var factory = this._container.domFactory();

				// Look up open habitats for this container in the dom
				var habitats = window.document.body.querySelectorAll('[data-habitat="' + this._container.id() + '"]');

				// Clean up
				for (var i = 0; i < habitats.length; ++i) {
					factory.dispose(habitats[i]);
					_Habitat2.default.destroy(habitats[i]);
				}

				// Reset and release
				this._container = null;
				this._elements = null;
				this._observer = null;

				// Handle callback
				_callback(cb, this);
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _ReactDomFactory = __webpack_require__(6);

	var _ReactDomFactory2 = _interopRequireDefault(_ReactDomFactory);

	var _Logger = __webpack_require__(1);

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
			_nextId = _nextId + 1;
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HABITAT_HOST_KEY = 'habitatHostElement';
	var HABITAT_NAMESPACE = 'data-habitat';
	var ACTIVE_HABITAT_FLAG = 'data-has-habitat';
	var HABITAT_PROP = 'data-prop-';
	var HABITAT_JSON_PROP = 'data-props';
	var HABITAT_NUMBER_PROP = 'data-n-prop-';
	var HABITAT_REF_PROP = 'data-r-prop-';

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
						if (a.name === HABITAT_JSON_PROP) {
							// Parse all of the props as json
							Object.assign(props, JSON.parse(a.value));
						} else

							// Number type props
							if (a.name.indexOf('data-n-prop-') === 0) {

								// Convert prop name from hyphens to camel case
								var _name = getNameFor(HABITAT_NUMBER_PROP, a.name);

								// Parse the value as a float as it handles both floats and whole int's
								// Might want to look at configuring the radix somehow in the future
								props[_name] = parseFloat(a.value);
							} else

								// Reference type props
								if (window && a.name.indexOf(HABITAT_REF_PROP) === 0) {

									// Convert prop name from hyphens to camel case
									var _name2 = getNameFor(HABITAT_REF_PROP, a.name);

									// Set the reference to the global object
									props[_name2] = window[a.value];
								}
				}

				return props;
			}

			/**
	  * Creates a new habitat in the dom
	  * @param {HTMLElement}     ele   - The element
	  * @param {string}          id    - The container id
	  * @returns {Element}
	  */

		}, {
			key: 'create',
			value: function create(ele, id) {

				if (window.document.body === ele || ele === null || ele === undefined) {
					_Logger2.default.warn('RHW04', 'Cannot open a habitat for element.', ele);
					return null;
				}

				var tag = 'span';

				// If tag is a block level element, then replicate it with the portal
				if (getDisplayType(ele) === 'block') {
					tag = 'div';
				}

				var habitat = window.document.createElement(tag);
				var className = ele.getAttribute('data-habitat-class') || null;

				var replaceDisabled = false;
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
		}]);

		return Habitat;
	}();

	exports.default = Habitat;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports._Mixin = undefined;
	exports.createBootstrapper = createBootstrapper;

	var _Bootstrapper2 = __webpack_require__(2);

	var _Bootstrapper3 = _interopRequireDefault(_Bootstrapper2);

	var _Container = __webpack_require__(3);

	var _Container2 = _interopRequireDefault(_Container);

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
		function _Mixin(spec) {
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

			// Create a new container
			var container = new _Container2.default();

			// Map the components
			for (var i = 0; i < spec.container.length; i++) {
				container.register(spec.container[i].register, spec.container[i].for);
			}

			// Finally, set the container
			_this.setContainer(container);
			return _this;
		}

		return _Mixin;
	}(_Bootstrapper3.default);

	/*
	* The classic bootstrapper
	*/


	function createBootstrapper(spec) {
		return new _Mixin(spec);
	}

/***/ }),
/* 6 */
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


	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(8);

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
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ])
});
;