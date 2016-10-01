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
            console[type].apply(undefined, args);
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
         */
        value: function warn(code, msg) {
            var args = concatArgs('WARNING: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase(), arguments);
            log('warn', args);
        }

        /**
         * Log an error
         * @param {string}  code    - The warning code
         * @param {string}  msg     - The error message
         */

    }, {
        key: 'error',
        value: function error(code, msg) {
            var args = concatArgs('ERROR: ' + code + ' ' + msg + ' ' + WARN_DEFINITIONS_URL + '#' + code.toLowerCase(), arguments);
            log('error', args);
        }
    }]);

    return Logger;
}();

exports.default = Logger;
module.exports = exports['default'];