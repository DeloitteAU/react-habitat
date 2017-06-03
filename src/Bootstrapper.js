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
 * @param {object}				context		- The context of the callback
 * @param {...object}			args		- Arguments to apply
 * @private
 */
function _callback(cb, context, ...args) {
	if (typeof cb === 'function') {
		cb.call(context, ...args);
	}
}


/**
 * Apply a container to nodes and populate components
 * @param {array}		container			- The container
 * @param {array}		nodes				- The elements to parse
 * @param {string}		componentSelector 	- The component selector
 * @param {function}	[cb=null]			- Optional callback
 * @private
 */
function _applyContainer(container, nodes, componentSelector, cb = null) {

	const factory = container.domFactory();
	const id = container.id();
	const resolveQueue = [];

	// Iterate over component elements in the dom
	for (let i = 0; i < nodes.length; ++i) {
		const ele = nodes[i];

		// Ignore elements that have already been connected
		if (Habitat.hasHabitat(ele)) {
			continue;
		}

		const componentName = ele.getAttribute(componentSelector);
		resolveQueue.push(
			container
			.resolve(componentName)
			.then((registration) => {
				// This is an expensive operation so only do on non prod builds
				if (process.env.NODE_ENV !== 'production') {
					if (ele.querySelector(`[${componentSelector}]`)) {
						Logger.warn('RHW08', 'Component should not contain any nested components.', ele);
					}
				}

				// Handle any esModule's with default exports
				// This helps developers out with writing cleaner container code otherwise
				// they will need to wrap `import()`'s in Promises that return the default.. yuk
				// https://github.com/webpack/webpack.js.org/pull/213
				let component = registration;
				if (registration.__esModule && registration.default) {
					component = registration.default;
				}

				// Inject the component
				factory.inject(
					component,
					Habitat.parseProps(ele),
					Habitat.create(ele, id));
			}).catch((err) => {
				Logger.error('RHW01', `Cannot resolve component "${componentName}" for element.`, err, ele);
			})
		);
	}

	// Trigger callback when all promises are finished
	// regardless if some fail
	Promise
		.all(resolveQueue.map(p => p.catch(e => e)))
		.then(() => {
			_callback(cb);
		}).catch((err) => {
			// We should never get here.. if we do this is a bug
			throw err;
		});
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

		/**
		 * Observing persistence status flag
		 * @type {boolean}
		 * @private
		 */
		this._isWatching = false;
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
			_callback(cb, this);
		});
	}

	/**
	* Apply the container to an updated dom structure
	* @param {node}		node		- Target node to parse or null for entire document body
	* @param {function}		[cb=null]	- Optional callback
	*/
	update(node, cb = null) {
		// Check if we have a container before attempting an update
		if (!this._container) {
			_callback(cb);
			return;
		}

		const target = node || window.document.body.querySelectorAll(`[${this.componentSelector}]`);

		// Lifecycle event
		// Hook to allow developers to cancel operation
		if (typeof this.shouldUpdate === 'function') {
			if (this.shouldUpdate(target) === false) {
				_callback(cb, this);
				return;
			}
		}

		// Temporarily stop the watcher from triggering from our own Habitat injections
		// This is better for performance however, this could possibly miss any
		// mutations during the parsing time.. possible bug maybe? dont know yet.
		const shouldWatcherPersist = this._isWatching;
		if (shouldWatcherPersist) {
			this.stopWatcher();
		}

		// Lifecycle event
		if (typeof this.willUpdate === 'function') {
			this.willUpdate(target);
		}

		_applyContainer(
			this._container,
			target,
			this.componentSelector,
			() => {
				// Restart the dom watcher if persisting
				if (shouldWatcherPersist) {
					this.startWatcher();
				}

				// Lifecycle event
				if (typeof this.didUpdate === 'function') {
					this.didUpdate(target);
				}

				_callback(cb, this);
			}
		);
	}

	/**
	 * Start DOM watcher for auto wire ups
	 */
	startWatcher() {
		// Feature available?
		if (typeof MutationObserver === 'undefined') {
			Logger.error('RHE09', 'MutationObserver not available.');
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

		// Set flag for persistence during update's
		this._isWatching = true;
	}

	/**
	 * Stop the DOM watcher if running
	 */
	stopWatcher() {
		if (this._observer && this._observer.disconnect) {
			this._observer.disconnect();
		}
		this._isWatching = false;
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
		this._observer = null;
		this._isWatching = false;

		// Handle callback
		_callback(cb, this);
	}
}
