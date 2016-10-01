/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

let empty = function(){};
let log = empty;
let concatArgs = empty;
const WARN_DEFINITIONS_URL = 'http://tinyurl.com/jxryd3s';

// If not production update the stubs
if (process.env.NODE_ENV !== 'production') {

    /**
     * Safely log to the console
     */
    log = (type, args) => {

        if (typeof console !== 'undefined' && console[type]) {
            console[type].apply(undefined, args);
        }
    };

    /**
     * Concats the message and arguments into a single array
     */
    concatArgs = (msg, args) => {
        let throwArgs = [msg];

        if (args && args.length > 2) {
            for (let i = 2; i < args.length; i++) {
                throwArgs.push(args[i]);
            }
        }

        return throwArgs;
    };

}

/**
 * Logger class for debugging React Habitat
 */
export default class Logger {

    /**
     * Log a warning
     * @param {string}  code    - The warning code
     * @param {string}  msg     - The warning message
     */
	static warn(code, msg) {
        let args = concatArgs(
            `WARNING: ${code} ${msg} ${WARN_DEFINITIONS_URL}#${code.toLowerCase()}`,
            arguments
        );
        log('warn', args);
	}

    /**
     * Log an error
     * @param {string}  code    - The warning code
     * @param {string}  msg     - The error message
     */
    static error(code, msg) {
        let args = concatArgs(
            `ERROR: ${code} ${msg} ${WARN_DEFINITIONS_URL}#${code.toLowerCase()}`,
            arguments
        );
        log('error', args);
    }

}