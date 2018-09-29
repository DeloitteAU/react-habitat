/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IDomFactory }	from 'react-habitat';

declare module "react-habitat-redux" {

	class ReduxDomFactory implements IDomFactory {

		/**
		 * Constructor
		 * @param {*}			store		- The Redux store
		 */
		constructor(store: any);

		/**
		 * The inject method after a wire-up has been requested
		 * @param {*}			module		- The component
		 * @param {object}		props		- The components properties
		 * @param {Element}		target		- The element to inject the component into
		 */
		inject: (module: any, props: {}, target: Element) => void;

		/**
		 * The dispose method
		 * @param {Element}		target		- The element to dispose
		 */
		dispose: (target: Element) => void;
	}
}
