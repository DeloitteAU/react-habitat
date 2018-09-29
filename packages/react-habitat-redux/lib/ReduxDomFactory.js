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

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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