/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Container 			from '../src/Container';
import Bootstrapper 		from '../src/Bootstrapper';
import ContainerBuilder		from '../src/builder/ContainerBuilder';
import MockComponent 		from './mocks/MockComponent';
import MockComponentTwo 	from './mocks/MockComponentTwo';

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
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);

			done();
		});

		expect(app).toBeDefined();
	});


	it('should render multiple components', (done) => {
		node.innerHTML =
			'<div data-component="IMockComponent"></div>' +
			'<div data-component="IMockComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(2);
			done();
		});

		expect(app).toBeDefined();
	});


	it('should render two different components', (done) => {
		node.innerHTML =
			'<div data-component="IMockComponent"></div>' +
			'<div data-component="IMockComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		containerBuilder.register(MockComponentTwo).as('IMockComponentTwo');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MockComponentTwo\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(component2Lookup).not.toEqual(null);
			expect(component2Lookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should warn when rendering to elements that have components as children', (done) => {
		const html = '<div data-component="IMockComponent"><div data-component="IMockComponent"></div></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		spyOn(console, 'warn');

		const app = new App(containerBuilder.build(), () => {
			expect(console.warn).toHaveBeenCalled();
			done();
		});
	});

	it('should not warn when rendering to elements that have children that are not components', (done) => {
		spyOn(console, 'warn');

		const html = '<div data-component="IMockComponent"><p>Hello world</p></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			expect(console.warn).not.toHaveBeenCalled();
			done();
		});
	});

	it('should render to elements that have children that are not components', (done) => {
		spyOn(console, 'warn');

		const html = '<div data-component="IMockComponent"><p>Child</p></div>';
		node.innerHTML = html;

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			expect(console.warn).not.toHaveBeenCalled();

			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should render to elements with white space and line breaks', (done) => {
		node.innerHTML =
			'<div data-component="IMockComponent">  \n   \n</div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should pass props', (done) => {
		node.innerHTML = '<div data-component="IMockComponent" data-prop-title="test"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
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

		node.innerHTML = '<div data-component="IMockComponent"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('IMockComponent');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			function componentLookup() { return node.innerHTML.match(/\[component MockComponent\]/g); }
			expect(componentLookup()).not.toEqual(null);
			expect(componentLookup().length).toEqual(1);

			app.dispose(() => {
				expect(componentLookup()).toEqual(null);
				expect(node.innerHTML).toBe('<div data-component="IMockComponent"></div>');
				done();
			});
		});

		expect(app).toBeDefined();
	});


	it('should resolve components with a Promise', (done) => {

		node.innerHTML =
			'<div data-component="IMockComponent"></div>' +
			'<div data-component="IMockComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.registerAsync(new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MockComponent);
			}, 200);
		}))
		.as('IMockComponent');

		containerBuilder.registerAsync(new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MockComponentTwo);
			}, 200);
		}))
		.as('IMockComponentTwo');
		// --------------------------- //

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MockComponentTwo\]/g);
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
			'<div data-component="IMockComponent"></div>' +
			'<div data-component="IMockComponentTwo"></div>';

		// -- MOCH CONTAINER SET UP -- //
		const containerBuilder = new ContainerBuilder();
		containerBuilder.registerAsync(new Promise((resolve) => {
			window.setTimeout(() => {
				resolve(MockComponent);
			}, 200);
		}))
		.as('IMockComponent');

		containerBuilder.registerAsync(new Promise((resolve, reject) => {
			window.setTimeout(() => {
				reject(new Error('Testing'));
			}, 200);
		}))
		.as('IMockComponentTwo');
		// --------------------------- //

		spyOn(console, 'error');

		const app = new App(containerBuilder.build(), () => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			const component2Lookup = node.innerHTML.match(/\[component MockComponentTwo\]/g);
			expect(console.error).toHaveBeenCalledTimes(1);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(component2Lookup).toEqual(null);
			done();
		});

		expect(app).toBeDefined();
	});
});
