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

var _Logger = require('./Logger');

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