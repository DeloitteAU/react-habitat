/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createBootstrapper } from '../../src/classic/createBootstrapper';
import MochComponent from '../mochs/MochComponent';
import MochComponentTwo from '../mochs/MochComponentTwo';

describe('Classic Bootstrapper', () => {
	let node = null;

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should log missing container warning', () => {
		spyOn(console, 'warn');

		createBootstrapper({});

		expect(console.warn).toHaveBeenCalled();
	});

	it('should log unknown component warning', (done) => {
		spyOn(console, 'error');

		node.innerHTML = '<div data-component="aUnknownComponent"></div>';

		createBootstrapper({
			container: []
		}, () => {
			expect(console.error).toHaveBeenCalled();
			done();
		});
	});

	it('should render a component', (done) => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		createBootstrapper({
			container: [
				{ register: 'IMochComponent', for: MochComponent }
			]},
			() => {
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
				expect(componentLookup).not.toEqual(null);
				expect(componentLookup.length).toEqual(1);
				done();
			}
		);
	});


	it('should render multiple components', (done) => {
		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponent"></div>';

		createBootstrapper({
			container: [
				{ register: 'IMochComponent', for: MochComponent }
			]
		}, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(2);
			done();
		});
	});


	it('should render two different components', (done) => {
		node.innerHTML =
		'<div data-component="IMochComponent"></div>' +
		'<div data-component="IMochComponentTwo"></div>';

		createBootstrapper({
			container: [
				{ register: 'IMochComponent', for: MochComponent },
				{ register: 'IMochComponentTwo', for: MochComponentTwo }
			]
		}, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);

			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);

			expect(component2Lookup).not.toEqual(null);
			expect(component2Lookup.length).toEqual(1);
			done();
		});
	});

	it('should pass props', (done) => {
		node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

		createBootstrapper({
			container: [
				{ register: 'IMochComponent', for: MochComponent }
			]
		}, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const propLookup = node.innerHTML.match(/title='test'/g);

			expect(componentLookup).not.toEqual(null);
			expect(propLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(propLookup.length).toEqual(1);
			done();
		});
	});

	it('should dispose', (done) => {
		node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

		const app = createBootstrapper({
			container: [
				{ register: 'IMochComponent', for: MochComponent }
			]
		}, () => {
			function componentLookup() { return node.innerHTML.match(/\[component MochComponent\]/g); }

			expect(componentLookup()).not.toEqual(null);
			expect(componentLookup().length).toEqual(1);

			app.dispose();

			expect(componentLookup()).toEqual(null);
			done();
		});
	});
});
