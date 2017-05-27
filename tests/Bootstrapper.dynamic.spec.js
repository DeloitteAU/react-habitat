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

describe('Dynamic Watcher', () => {

	class App extends Bootstrapper {
		constructor(container, cb = null) {
			super();
			this.setContainer(container, cb);
			this.startWatcher();
		}
	}

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should render dynamic loaded elements via observer', (done) => {

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

			expect(componentLookup).toEqual(null);

			// Now add the HTML after the app has finished initialising
			node = document.createElement('div');
			node.innerHTML = '<div data-component="IMochComponent"></div>';

			// We expect this to trigger the watcher
			window.document.body.appendChild(node);

			// Give the watcher some grace time as it runs async
			window.setTimeout(() => {
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
				expect(componentLookup.length).toEqual(1);
				app.dispose(); // Stop the watcher for other tests
				done();
			}, 500);
		});
	});
});
