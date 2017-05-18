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

	if (!elements || !elements.length) {
		return;
	}

	const factory = container.domFactory();
	const id = container.id();

	// Iterate over component elements in the dom
	for (let i = 0; i < elements.length; ++i) {
		const ele = elements[i];

		if (!Habitat.hasHabitat(ele)) {
			const componentName = ele.getAttribute(componentSelector);
			const component = container.resolve(componentName);
			if (component) {
				if (process.env.NODE_ENV !== 'production') {
					if (ele.querySelector(`[${componentSelector}]`)) {
						Logger.warn('RHW08', 'Component should not contain any nested components.', ele);
					}
				}
				factory.inject(
					component,
					Habitat.parseProps(ele),
					Habitat.create(ele, id));
			} else {
				Logger.error('RHW01', `Cannot resolve component "${componentName}" for element.`, ele);
			}
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

		// The container
		this._container = null;

		// Dom mutation observer
		this.enableDomWatcher = true;
		this._observer = null;
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

		// Wire up the components from the container
		parseContainer(
			this._container,
			window.document.body.querySelectorAll(`[${this.componentSelector}]`),
			this.componentSelector,
			cb
		);

		// Create a dom watcher if available
		if (typeof MutationObserver !== 'undefined') {
			this._observer = new MutationObserver(this._handleDomMutation.bind(this));
			// Start the dom watcher unless disabled
			if (this.enableDomWatcher) {
				this.startDomWatcher();
			}
		} else {
			Logger.warn('RHWXX', 'MutationObserver not available');
		}
	}

	/**
	* Apply the container to an updated dom structure
	* This should be triggered anytime HTML has been ajaxed in
	* @param {node}		node		- Target node to parse or null for entire document body
	* @param {function}  	[cb=null]   - Optional callback
	*/
	domDidUpdate(node, cb = null) {

		if (this._container === null) {
			return;
		}

		parseContainer(
			this._container,
			node || window.document.body.querySelectorAll(`[${this.componentSelector}]`),
			this.componentSelector,
			cb
		);
	}

	startDomWatcher() {
		if (this._observer) {
			this.stopDomWatcher();
			this._observer.observe(window.document.body, {
				childList: true,
				attributes: true,
				subtree: true,
				attributeFilter: [this.componentSelector],
			});
		}
	}

	stopDomWatcher() {
		if (this._observer && this._observer.disconnect) {
			this._observer.disconnect();
		}
	}

	/**
	* Handle dom mutation event
	* @param {MutationRecord}		mutationRecord		- The mutation record
	*/
	_handleDomMutation(mutationRecord) {
		if (typeof mutationRecord !== 'undefined') {
			this.domDidUpdate(mutationRecord.addedNodes);
		} else {
			// Polyfill Fallback
			this.domDidUpdate();
		}
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

		// Stop dom watcher if any
		this.stopDomWatcher();

		// Reset and release
		this._container = null;
		this._elements = null;
		this._observer = null;

		// Handle callback
		if (typeof cb === 'function') {
			cb.call();
		}
	}
}
