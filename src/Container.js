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
const assignId = (function idFactory() {
	let _nextId = 0;

	return function _assignId() {
		_nextId++;
		return `C${_nextId}`;
	};
}());


/**
 * The Container class
 */
export default class Container {

	/**
	* Constructor
	*/
	constructor() {
		this._components = {};
		this._id = assignId();
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
	* @param {string}  name    - A unique component key
	* @param {object}  comp    - The component
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
	* @param {string}    name    - The unique component key
	* @returns {object}
	*/
	resolve(name) {
		return this._components[name];
	}

	/**
	* Returns the containers dom factory
	* @returns {ReactDomFactory}
	*/
	domFactory() {
		return ReactDomFactory;
	}

	/**
	* Register a component in the container
	* @param {string}  name    - A unique component key
	* @param {object}  comp    - The component
	* @deprecated
	*/
	registerComponent(name, comp) {
		console.warn(
			'registerComponent is being deprecated. ' +
			'Please update to use "register()" instead.'
		);
		this.register(name, comp);
	}

	/**
	* Register multiple components to the container
	* @param {object}  comps     - The components
	*/
	registerComponents(comps) {
		console.warn(
			'registerComponents is being deprecated. ' +
			'Please update to use "registerAll()" instead.'
		);
		this.registerAll(comps);
	}

	/**
	* Gets a component for key
	* @param name
	* @returns {Object}
	* @deprecated
	*/
	getComponent(name) {
		console.warn('getComponent is being deprecated. Please update to use "resolve()" instead.');
		return this.resolve(name);
	}

}
