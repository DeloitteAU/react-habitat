/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDomFactory  from './factories/ReactDomFactory';
import Registration     from './Registration';
import Logger           from './Logger';

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

let hasOldAPIWarning = false;
const OLD_API_WARNING = 'Direct container registrations are being deprecated. Please use a ContainerBuilder.';

/**
 * The Container class
 */
export default class Container {

	/**
	* Constructor
	*/
	constructor(registrations = {}, factory = ReactDomFactory) {

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
		this._registrations = registrations;

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
	 * Gets a registration for a key
	 * @param {string}      key          - The registration key
	 * @returns {null|Registration}      - Returns registration otherwise null if not found
	 * @private
	 */
	_getRegistration(key) {
		const registration = this._registrations[key];

		if (!registration || !registration.operator) {
			return null;
		}

		return registration;
	}

	/**
	 * Resolves the operator for a registration
	 * @param {Registration}        registration        - The registration
	 * @param {*}                   context             - The context the operator is run in
	 * @returns {Promise}
	 * @private
	 */
	_applyOperatorFor(registration, context) {
		const assignedOperator = registration.operator.call(context, this);

		// Wrap in a promise if the component resolved without one
		if (!_isPromise(assignedOperator)) {
			return Promise.resolve(assignedOperator);
		}

		return new Promise((resolve, reject) => {
			assignedOperator
				.then((o) => {

					// Handle any esModule's with default exports
					// This helps developers write cleaner container code otherwise
					// they will need to wrap `import()`'s in Promises that return the default.. yuk
					// https://github.com/webpack/webpack.js.org/pull/213
					let component = o;
					if (o.__esModule && o.default) {
						component = o.default;
					}

					resolve(component);
					return component;
				})
				.catch(reject);
		});
	}

	/**
	* Resolve a component from the container
	* @param {string}       name        - The unique component key
	* @param {*}           [inContext=undefined]   - The context the operator is run in
	* @returns {Promise}
	*/
	resolve(name, inContext = undefined) {
		return new Promise((resolve, reject) => {
			const registration = this._getRegistration(name);
			if (!registration) {
				reject(new Error('Cannot resolve registration.'));
				return null;
			}

			this._applyOperatorFor(registration, inContext)
				.then(resolve)
				.catch(reject);
		});
	}

	/**
	 * Resolve a component from the container with its meta data
	 * @param {string}      name                    - The unique component key
	 * @param {*}           [inContext=undefined]   - The context the operator is run in
	 * @returns {Promise}
	 */
	resolveWithMeta(name, inContext = undefined) {
		return new Promise((resolve, reject) => {
			const registration = this._getRegistration(name);
			if (!registration) {
				reject(new Error('Cannot resolve registration.'));
				return null;
			}

			this._applyOperatorFor(registration, inContext)
				.then((o) => {
					resolve({
						component: o,
						meta: registration.meta,
					});
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

	//region Deprecated

	/**
	 * Register a component in the container
	 * @param {string}           key     - A unique component key
	 * @param {object|Promise}   comp    - The component or Promise
	 * @deprecated
	 */
	register(key, comp) {
		if (typeof key !== 'string') {
			throw new Error('Unexpected component key. Expects a string.', name);
		}

		if (!hasOldAPIWarning) {
			hasOldAPIWarning = true;
			Logger.warn('RHW03', OLD_API_WARNING);
		}

		this._registrations[key] = new Registration(() => comp).as(key);
	}

	/**
	 * Register multiple components to the container
	 * @param {object}  comps     - The components
	 * @deprecated
	 */
	registerAll(comps) {
		if (typeof comps !== 'object') {
			throw new Error('Unexpected components type. Expects type object', comps);
		}

		if (!hasOldAPIWarning) {
			hasOldAPIWarning = true;
			Logger.warn('RHW03', OLD_API_WARNING);
		}

		Object.keys(comps).forEach((key) => {
			this._registrations[key] = new Registration(() => comps[key]).as(key);
		});
	}

	/**
	 * Register a component in the container
	 * @param {string}  name    - A unique component key
	 * @param {object}  comp    - The component
	 * @deprecated
	 */
	registerComponent(name, comp) {
		if (!hasOldAPIWarning) {
			hasOldAPIWarning = true;
			Logger.warn('RHW03', OLD_API_WARNING);
		}
		this.register(name, comp);
	}

	/**
	 * Register multiple components to the container
	 * @param {object}  comps     - The components
	 */
	registerComponents(comps) {
		if (!hasOldAPIWarning) {
			hasOldAPIWarning = true;
			Logger.warn('RHW03', OLD_API_WARNING);
		}
		this.registerAll(comps);
	}

	/**
	 * Gets a component for key
	 * @param name
	 * @returns {Object}
	 * @deprecated
	 */
	getComponent(name) {
		Logger.warn('RHW03', 'getComponent is being deprecated. Please use "resolve" instead.');
		return this.resolve(name);
	}

	/**
	 * The containers dom factory
	 * @returns {ReactDomFactory}
	 @deprecated
	 */
	domFactory() {
		Logger.warn('RHW03', 'domFactory() is being deprecated. Please use `factory`.');
		return this.factory;
	}

	//endregion

}

