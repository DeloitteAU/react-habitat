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

	it('should log unknown component warning', (done) => {
		spyOn(console, 'error');

		node.innerHTML = '<div data-component="aUnknownComponent"></div>';
		const app = new App(new Container(), () => {

			expect(console.error).toHaveBeenCalled();
			expect(node.innerHTML).toBe('<div data-component="aUnknownComponent"></div>');
			done();
		});

		expect(app).toBeDefined();
	});

	it('should render a component', (done) => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);

			done();
		});

		expect(app).toBeDefined();
	});


	it('should render multiple components', (done) => {
		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(2);
			done();
		});

		expect(app).toBeDefined();
	});


	it('should render two different components', (done) => {
		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		container.register('IMochComponentTwo', MochComponentTwo);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(component2Lookup).not.toEqual(null);
			expect(component2Lookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should warn when rendering to elements that have components as children', (done) => {
		const html = '<div data-component="IMochComponent"><div data-component="IMochComponent"></div></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		spyOn(console, 'warn');

		const app = new App(container, () => {
			expect(console.warn).toHaveBeenCalled();
			done();
		});
	});

	it('should not warn when rendering to elements that have children that are not components', (done) => {
		spyOn(console, 'warn');

		const html = '<div data-component="IMochComponent"><p>Hello world</p></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			expect(console.warn).not.toHaveBeenCalled();
			done();
		});
	});

	it('should render to elements that have children that are not components', (done) => {
		spyOn(console, 'warn');

		const html = '<div data-component="IMochComponent"><p>Child</p></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			expect(console.warn).not.toHaveBeenCalled();

			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should render to elements with white space and line breaks', (done) => {
		node.innerHTML =
			'<div data-component="IMochComponent">  \n   \n</div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should pass props', (done) => {
		node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const propLookup = node.innerHTML.match(/title='test'/g);
			expect(componentLookup).not.toEqual(null);
			expect(propLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(propLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should not allow direct container replacements', () => {

		spyOn(console, 'error');

		const container1 = new Container();
		const container2 = new Container();

		const app = new App(container1);

		app.setContainer(container2);

		expect(console.error).toHaveBeenCalled();
	});

	it('should dispose', (done) => {

		node.innerHTML = '<div data-component="IMochComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', MochComponent);
		// --------------------------- //

		const app = new App(container, () => {
			function componentLookup() { return node.innerHTML.match(/\[component MochComponent\]/g); }
			expect(componentLookup()).not.toEqual(null);
			expect(componentLookup().length).toEqual(1);

			app.dispose(() => {
				expect(componentLookup()).toEqual(null);
				expect(node.innerHTML).toBe('<div data-component="IMochComponent"></div>');
				done();
			});
		});

		expect(app).toBeDefined();
	});


	it('should resolve components with a Promise', (done) => {

		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MochComponent);
			}, 200);
		}));
		container.register('IMochComponentTwo', new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MochComponentTwo);
			}, 300);
		}));
		// --------------------------- //

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(component2Lookup).not.toEqual(null);
			expect(component2Lookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should resolve components with a failed Promise', (done) => {

		node.innerHTML =
			'<div data-component="IMochComponent"></div>' +
			'<div data-component="IMochComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const container = new Container();
		container.register('IMochComponent', new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MochComponent);
			}, 300);
		}));
		container.register('IMochComponentTwo', new Promise((resolve, reject) => {
			window.setTimeout(() => {
				reject(new Error('Error test'));
			}, 150);
		}));
		// --------------------------- //

		spyOn(console, 'error');

		const app = new App(container, () => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);
			expect(console.error).toHaveBeenCalledTimes(1);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(component2Lookup).toEqual(null);
			done();
		});

		expect(app).toBeDefined();
	});
});
