/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDomFactory  from './factories/ReactDomFactory';

/**
 * Creates a unique id
 * Example 'C22'
 * @returns {string}
 */
const _assignId = (function idFactory() {
	let nextId = 0;
	return function _assignId() {
		nextId = nextId + 1;
		return `C${nextId}`;
	};
}());

/**
 * The Container class
 */
export default class Container {

	/**
	* Constructor
	*/
	constructor(factory = ReactDomFactory, registrations = {}) {

		/**
		 * The container id
		 * @type {string}
		 * @private
		 */
		this._id = _assignId();

		/**
		 * The containers registrations
		 * @type {Object}
		 * @private
		 */
		this._registrations = registrations || {};

		/**
		 * The containers dom factory
		 * @type {ReactDomFactory}
		 * @private
		 */
		this._factory = factory;
	}

	/**
	* The unique id for this container
	* @returns {*}
	*/
	get id() {
		return this._id;
	}

	/**
	* Resolve a component from the container
	* @param {string}       key                     - The unique component key
	* @returns {object}                             - Component with meta
	*/
	resolve(key) {
		return new Promise((resolve, reject) => {
			const registration = this._registrations[key];

			if (!registration || !registration.operator) {
				reject(new Error('Cannot resolve registration.'));
				return null;
			}

			registration
				.operator()
				.then((o) => {
					// Handle any esModule's with default exports
					// This helps developers write cleaner container code otherwise
					// they will need to wrap `import()`'s in Promises that return the default..
					// https://github.com/webpack/webpack.js.org/pull/213
					let component = o;
					if (o.__esModule && o.default) {
						component = o.default;
					}

					resolve({
						component,
						meta: registration.meta,
					});
					return component;
				})
				.catch(reject);
		});
	}

	/**
	 * The containers factory
	 * @returns {ReactDomFactory}
	 */
	get factory() {
		return this._factory;
	}

	/**
	 * Returns the number of registrations in the container
	 */
	get length() {
		return Object.keys(this._registrations).length;
	}
}
