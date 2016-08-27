(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ReactDOM"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["ReactDOM", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactHabitat"] = factory(require("ReactDOM"), require("react"));
	else
		root["ReactHabitat"] = factory(root["ReactDOM"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Bootstrapper = __webpack_require__(1);

	var _Bootstrapper2 = _interopRequireDefault(_Bootstrapper);

	var _Container = __webpack_require__(2);

	var _Container2 = _interopRequireDefault(_Container);

	var _createBootstrapper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		Bootstrapper: _Bootstrapper2.default,
		Container: _Container2.default,
		createBootstrapper: _createBootstrapper.createBootstrapper
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	var _Habitat = __webpack_require__(3);

	var _Habitat2 = _interopRequireDefault(_Habitat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_HABITAT_SELECTOR = 'data-component';

	/**
	 * Parses a container and populate components
	 * @param {array}     container             The container
	 * @param {array}     elements              The elements to parse
	 * @param {string}    componentSelector     The component selector
	 * @param cb
	 */
	function parseContainer(container, elements, componentSelector) {
		var cb = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];


		var factory = container.domFactory();
		var id = container.id();

		// Iterate over component elements in the dom
		for (var i = 0; i < elements.length; ++i) {
			var ele = elements[i];
			var componentName = ele.getAttribute(componentSelector);
			var component = container.resolve(componentName);

			if (component) {
				factory.inject(component, _Habitat2.default.parseProps(ele), _Habitat2.default.create(ele, id));
			} else if (componentName === null || componentName === '' || componentName === undefined) {
				console.warn('Cannot read attribute value with \'' + componentSelector + '\' for element.', ele);
			} else {
				console.warn('Cannot resolve component "' + componentName + '" for', ele);
			}
		}

		if (typeof cb === 'function') {
			cb.call();
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

			// Set dom component selector
			this.componentSelector = DEFAULT_HABITAT_SELECTOR;

			// The target elements
			this._elements = null;

			// The container
			this._container = null;
		}

		/**
	  * Set the container
	  * @param {object}    container   - The container
	  * @param {function}  [cb=null]   - Optional callback
	  */


		_createClass(Bootstrapper, [{
			key: 'setContainer',
			value: function setContainer(container) {
				var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];


				if (this._container !== null) {
					throw new Error('A container is already set. Please call dispose() before assigning a new one.');
				}

				// Set the container
				this._container = container;

				// Find all the elements in the dom with the component selector attribute
				this._elements = window.document.body.querySelectorAll('[' + this.componentSelector + ']');

				// Wire up the components from the container
				parseContainer(this._container, this._elements, this.componentSelector, cb);
			}

			/**
	   * Dispose the container and destroy habitat instances
	   * @param {function}	[cb=null]	- Optional callback
	   */

		}, {
			key: 'dispose',
			value: function dispose() {
				var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


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

				// Handle callback
				if (typeof cb === 'function') {
					cb.call();
				}
			}
		}]);

		return Bootstrapper;
	}();

	exports.default = Bootstrapper;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
			key: 'registerComponent',
			value: function registerComponent(name, comp) {
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
			key: 'registerComponents',
			value: function registerComponents(comps) {
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
	  * Gets a component for key
	  * @param name
	  * @returns {Object}
	  * @deprecated
	  */

		}, {
			key: 'getComponent',
			value: function getComponent(name) {
				console.warn('getComponent is being deprecated. Please update to use "resolve()" instead.');
				return this.resolve(name);
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
		}]);

		return Container;
	}();

	exports.default = Container;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

	function firstLetterToUpper(input) {
		return input[1].toUpperCase();
	}

	/**
	 * The host id
	 * @type {string}
	 */
	var HABITAT_HOST_KEY = 'habitatHostElement';
	var HABITAT_NAMESPACE = 'data-habitat';
	var ACTIVE_HABITAT_FLAG = 'data-has-habitat';

	/**
	 * Determine an elements computed display style
	 * @param {HTMLElement}		ele		- The element to test
	 * @returns {string}				- Returns 'block' or 'inline'
	 */
	function getDisplayType(ele) {
		var cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
		return cStyle.display;
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
					proxy: ele };

				// Populate custom props from reading any ele attributes that start with 'data-prop-'
				for (var i = 0; i < ele.attributes.length; i++) {
					var a = ele.attributes[i];

					if (a.name.indexOf('data-prop-') >= 0) {
						// Convert prop name from hyphens to camel case
						var name = a.name.replace('data-prop-', '').replace(/-([a-z])/g, firstLetterToUpper);

						var value = a.value || '';

						// Parse booleans
						if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
							value = false;
						}
						if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
							value = true;
						}

						// Parse json strings
						if (typeof value === 'string' && value.length > 2 && (value[0] === '{' && value[value.length - 1] === '}' || value[0] === '[' && value[value.length - 1] === ']')) {
							value = JSON.parse(value);
						}

						props[name] = value;
					} else if (a.name === 'data-props') {
						Object.assign(props, JSON.parse(a.value));
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
					console.warn('Cannot open a habitat for ', ele);
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

					// Check it is empty first
					if (ele.innerHTML !== '') {
						throw new Error('React Habitat elements must be empty. ' + 'Any child components should be added inside React.');
					}

					if (!replaceDisabled) {
						// Detach it
						var host = ele.parentNode.removeChild(ele);

						// But try to keep a reference to the host in-case destroy is ever called
						// and we need to reinstate it back to how we found it
						try {
							habitat[HABITAT_HOST_KEY] = host;
						} catch (e) {
							// Expando is off
							console.warn('Arbitrary properties are disabled ' + 'and Habitat may not dispose correctly.', e);
						}
					}
				} else {
					// The element is an input, leave it in the
					// dom to allow passing data back to the backend again
					// // Set a flag so we know its been proccessed
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports._Mixin = undefined;
	exports.createBootstrapper = createBootstrapper;

	var _Bootstrapper2 = __webpack_require__(1);

	var _Bootstrapper3 = _interopRequireDefault(_Bootstrapper2);

	var _Container = __webpack_require__(2);

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
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_Mixin).call(this));

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
				container.registerComponent(spec.container[i].register, spec.container[i].for);
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

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
				var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
				var target = arguments[2];

				if (target) {
					_reactDom2.default.render(_react2.default.createElement(module, props || {}), target);
				} else {
					console.warn('Target element is null or undefined. Cannot inject component');
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;