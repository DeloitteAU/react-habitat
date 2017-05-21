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
 * Safe callback wrapper
 * @param {null|function}		cb			- The callback
 * @private
 */
function _callback(cb) {
	if (typeof cb === 'function') {
		cb();
	}
}

/**
 * Apply a container to nodes and populate components
 * @param {array}     container             The container
 * @param {array}     nodes              	The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param {function}  [cb=null]   			- Optional callback
 * @private
 */
function _applyContainer(container, nodes, componentSelector, cb = null) {

	// Bail out early if no elements to parse
	if (!nodes || !nodes.length) {
		_callback(cb);
		return;
	}

	const factory = container.domFactory();
	const id = container.id();

	// Iterate over component elements in the dom
	for (let i = 0; i < nodes.length; ++i) {
		const ele = nodes[i];

		// Ignore elements that have already been connected
		if (Habitat.hasHabitat(ele)) {
			continue;
		}

		const componentName = ele.getAttribute(componentSelector);
		const component = container.resolve(componentName);
		if (component) {
			// Expensive operation, only do on non prod builds
			if (process.env.NODE_ENV !== 'production') {
				if (ele.querySelector(`[${componentSelector}]`)) {
					Logger.warn('RHW08', 'Component should not contain any nested components.', ele);
				}
			}

			// Inject the component
			factory.inject(
				component,
				Habitat.parseProps(ele),
				Habitat.create(ele, id));
		} else {
			Logger.error('RHW01', `Cannot resolve component "${componentName}" for element.`, ele);
		}
	}

	_callback(cb);
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

		/**
		 * The DOM component selector
		 * @type {string}
		 */
		this.componentSelector = DEFAULT_HABITAT_SELECTOR;

		/**
		 * If true, the container will be applied to dom mutations automatically. True by default.
		 * i.e update(*addedNodes*)
		 * @type {boolean}
		 */
		this.enableWatcher = true;

		/**
		 * The container
		 * @type {Container|null}
		 * @private
		 */
		this._container = null;

		/**
		 * The watcher's observer instance or null
		 * @type {MutationObserver|null}
		 * @private
		 */
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
		this.update(null, () => {
			_callback(cb);
		});
	}

	/**
	* Apply the container to an updated dom structure
	* This should be triggered anytime HTML has been ajaxed in
	* @param {node}		node		- Target node to parse or null for entire document body
	* @param {function}		[cb=null]	- Optional callback
	*/
	update(node, cb = null) {
		// Check if we have a container before attempting an update
		if (!this._container) {
			_callback(cb);
			return;
		}

		_callback(this.domWillUpdate);

		// Temporarily stop the watcher from triggering due to Habitat injections
		// Note: This could possibly miss some dom changes during parse time.. bug maybe?
		this.stopWatcher();

		_applyContainer(
			this._container,
			node || window.document.body.querySelectorAll(`[${this.componentSelector}]`),
			this.componentSelector,
			() => {
				// Restart the dom watcher unless disabled
				if (this.enableWatcher) {
					this.startWatcher();
				}

				_callback(cb);
				_callback(this.domDidUpdate);
			}
		);
	}

	/**
	 * Start DOM watcher for auto wire ups
	 */
	startWatcher() {
		// If disabled, do nothing
		if (!this.enableWatcher) {
			return;
		}

		// Feature available?
		if (typeof MutationObserver === 'undefined') {
			Logger.warn('RHWXX', 'MutationObserver not available');

			// Auto disable it so it dosnt attempt to start again
			this.enableWatcher = false;
			return;
		}

		// Create observer if not assigned already
		if (!this._observer) {
			this._observer = new MutationObserver(this._handleDomMutation.bind(this));
		}

		// Start observing for dom changes filtered by our component selector
		this._observer.observe(window.document.body, {
			childList: true,
			attributes: true,
			subtree: true,
			attributeOldValue: false,
			characterData: false,
			characterDataOldValue: false,
			attributeFilter: [this.componentSelector]
		});
	}

	/**
	 * Stop the DOM watcher if running
	 */
	stopWatcher() {
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
			// Only run update if nodes have been added
			const diff = mutationRecord.filter(r => r.addedNodes.length);
			if (diff.length) {
				this.update();
			}
		} else {
			// Fallback
			this.update();
		}
	}

	/**
	 * Dispose the container and destroy habitat instances
	 * @param {function}	[cb=null]	- Optional callback
	 */
	dispose(cb = null) {

		// Stop dom watcher if any
		this.stopWatcher();

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
		this._observer = null;

		// Handle callback
		_callback(cb, this);
	}
}
