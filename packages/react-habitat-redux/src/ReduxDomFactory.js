/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import { Provider }		from 'react-redux';
import React			from 'react';
import ReactDom			from 'react-dom';

/**
 * React Redux DOM Factory
 */
export default class ReduxDomFactory {

	constructor(store = null) {

		/**
		 * The redux store
		 */
		this.store = store;
	}

	/**
	 * Inject the module into the dom wrapped in a redux provider
	 * @param {*} module - The component to inject
	 * @param {object} props  - The component props
	 * @param {node} target - The node to inject to
	 */
	inject(module, props = {}, target) {
		if (target) {
			ReactDom.render(React.createElement(Provider, { store: this.store }, React.createElement(module, props)), target);
		}
	}

	/**
	 * Dispose of any react instances for a node
	 * @param {node} target - The node to tear down
	 */
	dispose(target) {
		if (target) {
			ReactDom.unmountComponentAtNode(target);
		}
	}
}
