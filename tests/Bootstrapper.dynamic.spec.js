/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Container 			from '../src/Container';
import Bootstrapper 		from '../src/Bootstrapper';
import MockComponent 		from './mocks/MockComponent';

let node = null;

describe('Dynamic Watcher', () => {

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should render dynamic loaded elements via observer', (done) => {

		// //FIXME: THIS TEST FAILS WHEN TESTS ARE RUN CONCURRENTLY ON TRAVIS
		// if (process.env.TRAVIS) {
		// 	console.log('Skipping dynamic test. See FIXME');
		// 	done();
		// 	return;
		// }

		class App extends Bootstrapper {
			constructor(container, cb = null) {
				super();
				this.setContainer(container, () => {
					this.startWatcher();
					cb();
				});
			}
		}

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMockComponent', MockComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);

			expect(componentLookup).toEqual(null);

			// Now add the HTML after the app has finished initialising
			node = document.createElement('div');
			node.innerHTML = '<div data-component="IMockComponent"></div>';

			// We expect this to trigger the watcher
			window.document.body.appendChild(node);

			// Give the watcher some grace time as it runs async
			window.setTimeout(() => {
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup.length).toEqual(1);
				app.dispose(); // Stop the watcher for other tests
				done();
			}, 500);
		});
	});
});
