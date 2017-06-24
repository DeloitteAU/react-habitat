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
if (process.env.NODE_ENV !== 'production') {

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