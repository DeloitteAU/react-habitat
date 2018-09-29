/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React 		from 'react';
import ReactDOM 	from 'react-dom';
import Logger 		from '../Logger';

export default class ReactDomFactory {

	/**
	* Injects a react component
	* @param {object}			module		- The react component
	* @param {object}			props		- Props to initiate component with
	* @param {HTMLElement}		target		- The target element to inject to
	*/
	static inject(module, props = {}, target) {
		if (target) {
			ReactDOM.render(
				React.createElement(module, props || {}),
				target,
			);
		} else {
			Logger.warn('RHW07', 'Target element is null or undefined.');
		}
	}

	/**
	 *  Disposes a react component
	 * @param {HTMLElement}		target		- The target element to dispose
	 */
	static dispose(target) {
		if (target) {
			ReactDOM.unmountComponentAtNode(target);
		}
	}

}
