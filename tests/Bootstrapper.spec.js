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
import MochComponentTwo 	from './mochs/MochComponentTwo';

let node = null;

describe('Bootstrapper', () => {

	class App extends Bootstrapper {
		constructor(container, cb = null) {
			super();
			this.setContainer(container, cb);
		}
	}

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should log unknown component warning', () => {
		spyOn(console, 'warn');

		node.innerHTML = '<div data-component="aUnknownComponent"></div>';
		const app = new App(new Container());

		expect(app).toBeDefined();
		expect(console.warn).toHaveBeenCalled();
	});

	it('should render a component', () => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);
	});

	it('should render a component with callback', () => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		const mochCallbackHandler = jasmine.createSpy('My Method');
		// --------------------------- //

		const app = new App(container, mochCallbackHandler);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);
		expect(mochCallbackHandler).toHaveBeenCalledTimes(1);
	});

	it('should render multiple components', () => {
		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(2);
	});


	it('should render two different components', () => {
		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		container.register('IMochComponentTwo', MochComponentTwo);
		// --------------------------- //

		const app = new App(container);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
		const component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);
		expect(component2Lookup).not.toEqual(null);
		expect(component2Lookup.length).toEqual(1);
	});

	it('should not render to elements that have children', () => {
		node.innerHTML =
			'<div data-component="IMochComponent"><p>Child</p></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		expect(() => { return new App(container)}).toThrow();

	});

	it('should render to elements with white space and line breaks', () => {
		node.innerHTML =
			'<div data-component="IMochComponent">  \n   \n</div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);

	});

	it('should pass props', () => {
		node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container);
		const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
		const propLookup = node.innerHTML.match(/title='test'/g);

		expect(app).toBeDefined();
		expect(componentLookup).not.toEqual(null);
		expect(propLookup).not.toEqual(null);
		expect(componentLookup.length).toEqual(1);
		expect(propLookup.length).toEqual(1);
	});

	it('should not allow direct container replacements', () => {

		const container1 = new Container();
		const container2 = new Container();

		const app = new App(container1);

		function test() {
			app.setContainer(container2);
		}

		expect(test).toThrowError();

	});

	it('should dispose', () => {

		node.innerHTML = '<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container);

		function componentLookup() { return node.innerHTML.match(/\[component MochComponent\]/g); }

		expect(app).toBeDefined();
		expect(componentLookup()).not.toEqual(null);
		expect(componentLookup().length).toEqual(1);

		app.dispose();

		expect(componentLookup()).toEqual(null);
		expect(node.innerHTML).toBe('<div data-component="IMochComponent"></div>');

	});

	it('should dispose with callback', () => {

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		const mochCallbackHandler = jasmine.createSpy('My Method');
		// --------------------------- //

		const app = new App(container);
		app.dispose(mochCallbackHandler);

		expect(app).toBeDefined();
		expect(mochCallbackHandler).toHaveBeenCalledTimes(1);
	});
});
