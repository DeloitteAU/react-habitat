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
		 * Slashes to avoid super collisions
		 * @type {Container|null}
		 * @private
		 */
		this.__container__ = null;
	}

	/**
	 * Apply the container to nodes
	 * @param {array}		nodes				- The elements to parse
	 * @param {function}	[cb=null]			- Optional callback
	 * @private
	 */
	_apply(nodes, cb = null) {
		// const factory = container.domFactory();
		// const id = container.id();
		const resolveQueue = [];

		// Iterate over component elements in the dom
		for (let i = 0; i < nodes.length; ++i) {
			const ele = nodes[i];

			// Ignore elements that have already been connected
			if (Habitat.hasHabitat(ele)) {
				continue;
			}

			// Resolve components using promises
			const componentName = ele.getAttribute(this.componentSelector);
			resolveQueue.push(
				this.__container__
					.resolve(componentName, this)
					.then((registration) => {
						// This is an expensive operation so only do on non prod builds
						if (process.env.NODE_ENV !== 'production') {
							if (ele.querySelector(`[${this.componentSelector}]`)) {
								Logger.warn('RHW08', 'Component should not contain any nested components.', ele);
							}
						}

						// Generate props
						let props = Habitat.parseProps(ele);
						if (registration.meta.defaultProps) {
							props = Object.assign({}, registration.meta.defaultProps, props);
						}

						// Options
						const options = registration.meta.options || {};

						// Inject the component
						this.__container__.factory.inject(
							registration.component,
							props,
							Habitat.create(ele, this.__container__.id, options));
					}).catch((err) => {
						Logger.error('RHW01', `Cannot resolve component "${componentName}" for element.`, err, ele);
					}),
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
	 * Set the container
	 * @param {object}    container   - The container
	 * @param {function}  [cb=null]   - Optional callback
	 */
	setContainer(container, cb = null) {
		if (this.__container__ !== null) {
			Logger.error('RHW02', 'A container is already set. ' +
				'Please call dispose() before assigning a new one.');
			return;
		}

		if (!container.factory ||
			typeof container.factory.inject !== 'function' ||
			typeof container.factory.dispose !== 'function') {
			Logger.error('RHE10', 'Incompatible factory');
			return;
		}

		// Set the container
		this.__container__ = container;

		// Wire up the components from the container
		this.update(null, () => {
			_callback(cb, this);
		});
	}

	/**
	 * The container
	 * @returns {Container}
	 */
	get container() {
		return this.__container__;
	}

	/**
	* Apply the container to an updated dom structure
	* @param {node}		node		- Target node to parse or null for entire document body
	* @param {function}		[cb=null]	- Optional callback
	*/
	update(node, cb = null) {
		// Check if we have a container before attempting an update
		if (!this.__container__) {
			_callback(cb);
			return;
		}

		const target = node || window.document.body;
		const query = target.querySelectorAll(`[${this.componentSelector}]`);

		if (!query.length) {
			// Nothing to update
			return;
		}

		// Lifecycle event
		// Hook to allow developers to cancel operation
		if (typeof this.shouldUpdate === 'function') {
			if (this.shouldUpdate(target, query) === false) {
				_callback(cb, this);
				return;
			}
		}

		// Lifecycle event
		if (typeof this.willUpdate === 'function') {
			this.willUpdate(target, query);
		}

		this._apply(
			query,
			() => {
				// Lifecycle event
				if (typeof this.didUpdate === 'function') {
					this.didUpdate(target);
				}

				_callback(cb, this);
			},
		);
	}

	/**
	 * Unmount all habitat instances for the container
	 * @param {function}	[cb=null]	- Optional callback
	 */
	unmountHabitats(cb = null) {

		// Lifecycle event
		if (typeof this.willUnmountHabitats === 'function') {
			this.willUnmountHabitats();
		}

		// Get open habitats for this container
		const habitats = Habitat.listHabitats(this.__container__.id);

		// Clean up
		for (let i = 0; i < habitats.length; ++i) {
			this.__container__.factory.dispose(habitats[i]);
			Habitat.destroy(habitats[i]);
		}

		// Lifecycle event
		if (typeof this.didUnmountHabitats === 'function') {
			this.didUnmountHabitats();
		}

		// Handle callback
		_callback(cb, this);
	}

	/**
	 * Dispose the container and destroy habitat instances
	 * @param {function}	[cb=null]	- Optional callback
	 */
	dispose(cb = null) {
		this.unmountHabitats(() => {
			// Reset and release
			this.__container__ = null;

			// Lifecycle event
			if (typeof this.didDispose === 'function') {
				this.didDispose();
			}

			// Handle callback
			_callback(cb, this);
		});
	}
}
