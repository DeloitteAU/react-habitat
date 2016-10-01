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


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Logger = require('../Logger');

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