/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Habitat from './Habitat';
import Logger from './Logger';

const DEFAULT_HABITAT_SELECTOR = 'data-component';

/**
 * Parses a container and populate components
 * @param {array}     container             The container
 * @param {array}     elements              The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param cb
 */
function parseContainer(container, elements, componentSelector, cb = null) {

	const factory = container.domFactory();
	const id = container.id();

	// Iterate over component elements in the dom
	for (let i = 0; i < elements.length; ++i) {
		const ele = elements[i];
		const componentName = ele.getAttribute(componentSelector);
		const component = container.resolve(componentName);

		if (component) {
			if (ele.querySelector(`[${componentSelector}]`)) {
				Logger.warn('RHW08', 'React Habitat should not contain additional components.', ele);
			}
			factory.inject(
				component,
				Habitat.parseProps(ele),
				Habitat.create(ele, id));
		} else {
			Logger.error('RHW01', `Cannot resolve component "${componentName}" for element.`, ele);
		}
	}

	if (typeof cb === 'function') {
		cb.call();
	}
}

/**
 *  Bootstrapper class
 */
export default class Bootstrapper {

	/**
	 * Constructor
	 */
	constructor() {
		// Sanity check
		if (!window || (!window && !window.document)) {
			throw new Error('React Habitat requires a window but cannot see one :(');
		}

		// Set dom component selector
		this.componentSelector = DEFAULT_HABITAT_SELECTOR;

		// The target elements
		this._elements = null;

		// The container
		this._container = null;
	}

	/**
	 * Set the container
	 * @param {object}    container   - The container
	 * @param {function}  [cb=null]   - Optional callback
	 */
	setContainer(container, cb = null) {

		if (this._container !== null) {
			Logger.error('RHW02', 'A container is already set. ' +
				'Please call dispose() before assigning a new one.');
			return;
		}

		// Set the container
		this._container = container;

		// Find all the elements in the dom with the component selector attribute
		this._elements = window.document.body.querySelectorAll(`[${this.componentSelector}]`);

		// Wire up the components from the container
		parseContainer(
			this._container,
			this._elements,
			this.componentSelector,
			cb
		);

	}

	/**
	 * Dispose the container and destroy habitat instances
	 * @param {function}	[cb=null]	- Optional callback
	 */
	dispose(cb = null) {

		// get the container's factory
		const factory = this._container.domFactory();

		// Look up open habitats for this container in the dom
		const habitats = window
			.document
			.body
			.querySelectorAll(`[data-habitat="${this._container.id()}"]`);

		// Clean up
		for (let i = 0; i < habitats.length; ++i) {
			factory.dispose(habitats[i]);
			Habitat.destroy(habitats[i]);
		}

		// Reset and release
		this._container = null;
		this._elements = null;

		// Handle callback
		if (typeof cb === 'function') {
			cb.call();
		}
	}
}
