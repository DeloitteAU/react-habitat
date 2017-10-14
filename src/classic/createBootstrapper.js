/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Logger from '../Logger';
import Bootstrapper from '../Bootstrapper';
import ContainerBuilder from '../builder/ContainerBuilder';


/*
* Mixin class used for extending the classic spec
* @private
*/
export class _Mixin extends Bootstrapper {

	/*
	* A Constructor that takes a spec
	*/
	constructor(spec, callback) {
		super();

		// Check if a container spec was supplied
		if (!spec.container) {
			console.warn('"Container" property was not supplied');
			return;
		}

		// Set the component selector if defined
		if (spec.componentSelector) {
			this.componentSelector = spec.componentSelector;
		}

		// Set the watcher value if defined
		if (typeof spec.enableWatcher === 'boolean') {
			this.enableWatcher = spec.enableWatcher;
		}

		// Create a new container
		const containerBuilder = new ContainerBuilder(spec.defaultOptions || null);

		// Map the components
		for (let i = 0; i < spec.container.length; i++) {
			let registration;
			if (spec.container[i].forAsync) {
				registration = containerBuilder
					.registerAsync(spec.container[i].forAsync)
					.as(spec.container[i].register);
			} else {
				registration = containerBuilder
					.register(spec.container[i].for)
					.as(spec.container[i].register);
			}

			if (spec.container[i].withDefaultProps) {
				registration.withDefaultProps(spec.container[i].withDefaultProps);
			}

			if (spec.container[i].withOptions) {
				registration.withOptions(spec.container[i].withOptions);
			}
		}

		this._shouldUpdateProxy = spec.shouldUpdate || null;
		this._willUpdateProxy = spec.willUpdate || null;
		this._didUpdateProxy = spec.didUpdate || null;
		this._willUnmountProxy = spec.willUnmountHabitats || null;
		this._didUnmountProxy = spec.didUnmountHabitats || null;
		this._didDisposeProxy = spec.didDispose || null;

		// Finally, set the container
		this.setContainer(containerBuilder.build(), () => {
			if (typeof callback === 'function') {
				callback();
			}
		});
	}

	shouldUpdate(node) {
		if (this._shouldUpdateProxy) {
			this._shouldUpdateProxy(node);
		}
	}

	willUpdate() {
		if (this._willUpdateProxy) {
			this._willUpdateProxy();
		}
	}

	didUpdate() {
		if (this._didUpdateProxy) {
			this._didUpdateProxy();
		}
	}

	willUnmountHabitats() {
		if (this._willUnmountProxy) {
			this._willUnmountProxy();
		}
	}

	didUnmountHabitats() {
		if (this._didUnmountProxy) {
			this._didUnmountProxy();
		}
	}

	didDispose() {
		if (this._didDisposeProxy) {
			this._didDisposeProxy();
		}
	}
}

/*
* The classic bootstrapper
*/
export function createBootstrapper(spec, cb = null) {
	return new _Mixin(spec, cb);
}
