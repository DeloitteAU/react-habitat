/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Bootstrapper from '../Bootstrapper';
import Container from '../Container';

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
		const container = new Container();

		// Map the components
		for (let i = 0; i < spec.container.length; i++) {
			container.register(
				spec.container[i].register,
				spec.container[i].for
			);
		}

		this._shouldUpdateProxy = spec.shouldUpdate || null;
		this._willUpdateProxy = spec.willUpdate || null;
		this._didUpdateProxy = spec.didUpdate || null;

		// Finally, set the container
		this.setContainer(container, callback);
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
}

/*
* The classic bootstrapper
*/
export function createBootstrapper(spec, cb = null) {
	return new _Mixin(spec, cb);
}
