/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Logger           from '../Logger';
import Registration     from '../Registration';
import Container        from '../Container';
import ReactDomFactory  from '../factories/ReactDomFactory';

export default class ContainerBuilder {
	constructor(options = null) {
		this._registrations = [];
		this._defaultOptions = options;
		this._factory = ReactDomFactory;
	}

	/**
	 * Register new component asynchronously
	 * @param {Promise}        operator    - promise that returns a React Component
	 * @returns {Registration}
	 */
	registerAsync(operator) {
		const registration = new Registration(operator);
		if (this._defaultOptions) {
			registration.withOptions(this._defaultOptions);
		}
		this._registrations.push(registration);
		return registration;
	}

	/**
	 * Register new component
	 * @param {object}        component    - a React Component to register
	 * @returns {Registration}
	 */
	register(component) {
		return this.registerAsync(Promise.resolve(component));
	}

	/**
	 * Set the container factory
	 * @param {Object}  factory - The factory
	 */
	set factory(factory) {
		this._factory = factory;
	}

	/**
	 * Build the container
	 * @returns {Container}
	 */
	build() {
		return new Container(
			this._factory,
			this._registrations.reduce((acc, registration) => {
				if (!registration.key) {
					Logger.error('RHE11', 'Missing key for registration.');
					return acc;
				}

				if (acc[registration.key]) {
					Logger.warn('RHW12', 'Duplicate key', registration.key);
				}

				acc[registration.key] = registration;
				return acc;
			}, {}),
		);
	}
}
