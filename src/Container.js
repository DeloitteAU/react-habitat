/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDomFactory from './factories/ReactDomFactory';

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
 * Determine if the object is a Promise
 * @param {*}   obj     - The test object
 * @returns {boolean}   - True if deemed to be a promise
 * @private
 */
const _isPromise = function(obj) {
	return !!obj &&
		(typeof obj === 'object' || typeof obj === 'function') &&
		typeof obj.then === 'function';
};

/**
 * The Container class
 */
export default class Container {

	/**
	* Constructor
	*/
	constructor() {
		this._components = {};
		this._id = _assignId();
	}

	/**
	* The unique id for this container
	* @returns {*}
	*/
	id() {
		return this._id;
	}

	/**
	* Register a component in the container
	* @param {string}           name    - A unique component key
	* @param {object|Promise}   comp    - The component or Promise
	*/
	register(name, comp) {
		if (typeof name !== 'string') {
			throw new Error('Unexpected component key. Expects a string.', name);
		}
		this._components[name] = comp;
	}

	/**
	* Register multiple components to the container
	* @param {object}  comps     - The components
	*/
	registerAll(comps) {
		if (typeof comps !== 'object') {
			throw new Error('Unexpected components type. Expects type object', comps);
		}

		Object.assign(this._components, comps);
	}

	/**
	* Resolve a component from the container
	* @param {string}       name        - The unique component key
	* @returns {Promise}
	*/
	resolve(name) {
		const registration = this._components[name];

		if (!registration) {
			return Promise.reject(new Error('Not Registered'));
		}

		if (_isPromise(registration)) {
			return registration;
		}

		return Promise.resolve(registration);
	}

	/**
	* Returns the containers dom factory
	* @returns {ReactDomFactory}
	*/
	domFactory() {
		return ReactDomFactory;
	}
}
