(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("ReactRedux"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "ReactRedux"], factory);
	else if(typeof exports === 'object')
		exports["ReactHabitatRedux"] = factory(require("React"), require("ReactDOM"), require("ReactRedux"));
	else
		root["ReactHabitatRedux"] = factory(root["React"], root["ReactDOM"], root["ReactRedux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
	exports.ReduxDomFactory = undefined;

	var _ReduxDomFactory = __webpack_require__(1);

	var _ReduxDomFactory2 = _interopRequireDefault(_ReduxDomFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.ReduxDomFactory = _ReduxDomFactory2.default;
	exports.default = _ReduxDomFactory2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _reactRedux = __webpack_require__(4);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * React Redux DOM Factory
	 */
	var ReduxDomFactory = function () {
		function ReduxDomFactory() {
			var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ReduxDomFactory);

			/**
	   * The redux store
	   */
			this.store = store;
		}

		/**
	  * Inject the module into the dom wrapped in a redux provider
	  * @param {*} module - The component to inject
	  * @param {object} props  - The component props
	  * @param {node} target - The node to inject to
	  */


		_createClass(ReduxDomFactory, [{
			key: 'inject',
			value: function inject(module) {
				var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var target = arguments[2];

				if (target) {
					_reactDom2.default.render(_react2.default.createElement(_reactRedux.Provider, { store: this.store }, _react2.default.createElement(module, props)), target);
				}
			}

			/**
	   * Dispose of any react instances for a node
	   * @param {node} target - The node to tear down
	   */

		}, {
			key: 'dispose',
			value: function dispose(target) {
				if (target) {
					_reactDom2.default.unmountComponentAtNode(target);
				}
			}
		}]);

		return ReduxDomFactory;
	}();

	exports.default = ReduxDomFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ])
});
;