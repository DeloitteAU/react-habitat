/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Container 			from '../src/Container';
import Bootstrapper 		from '../src/Bootstrapper';
import MochComponent 		from './mochs/MochComponent';

let node = null;

describe('Dynamic Bootstrapper Enabled', () => {

	class App extends Bootstrapper {
		constructor(container, cb = null) {
			super();
			this.setContainer(container, cb);
		}
	}

	// -- MOCH CONTAINER SET UP -- //
	const container = new Container();
	container.register('IMochComponent', MochComponent);
	// --------------------------- //

	// Create the app early before any components rendered on the page
	var app = new App(container);

	beforeEach((done) => {
		app = new App(container);

		// Ensure the HTML is added after app has initilised
		window.setTimeout(() => {
			node = document.createElement('div');
			node.innerHTML =
				'<div data-component="IMochComponent"></div>';

			// This should fire the MutationObserver
			window.document.body.appendChild(node);

			// Give the MutationObserver some grace time as it runs async
			window.setTimeout(done, 200);
		}, 300);
	});

	afterEach(() => {
		app.dispose();
		app = null;
		window.document.body.removeChild(node);
	});

	it('should render dynamic loaded elements via observer', () => {

		let componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);
	});
});
