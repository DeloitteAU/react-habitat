/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Logger from './Logger';

/**
 * Registration
 */
export default class Registration {
	constructor(operator) {
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
	get operator() {
		return this._operator;
	}

	/**
	 * The registration key
	 * @returns {string|*}
	 */
	get key() {
		return this._key;
	}

	/**
	 * The registration meta data
	 * @returns {Object}
	 */
	get meta() {
		return this._meta;
	}

	/**
	 * Set the registration key, must be unique
	 * @param {string}  key     - The key
	 * @returns {Registration}
	 */
	as(key) {
		if (typeof key !== 'string') {
			Logger.error('RHE13', 'Unexpected key type. Expected a string.', key);
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
	withDefaultProps(props) {
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
	withOptions(options) {
		this._meta.options = options;
		return this;
	}
}
