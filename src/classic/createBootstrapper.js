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
	constructor(spec) {
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

		// Finally, set the container
		this.setContainer(container);
	}
}

/*
* The classic bootstrapper
*/
export function createBootstrapper(spec) {
	return new _Mixin(spec);
}
