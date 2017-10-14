/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Bootstrapper 		from '../src/Bootstrapper';
import ContainerBuilder		from '../src/builder/ContainerBuilder';
import MockComponent 		from './mocks/MockComponent';

let node = null;

describe('Bootstrapper Lifecycle', () => {

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should trigger lifecycle events in order', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const shouldUpdate = jasmine.createSpy();
		const willUpdate = jasmine.createSpy();
		const didUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			shouldUpdate() {
				shouldUpdate();
				expect(willUpdate).toHaveBeenCalledTimes(0);
				expect(didUpdate).toHaveBeenCalledTimes(0);
			}

			willUpdate() {
				willUpdate();
				expect(shouldUpdate).toHaveBeenCalledTimes(1);
				expect(didUpdate).toHaveBeenCalledTimes(0);
			}

			didUpdate() {
				didUpdate();
				expect(shouldUpdate).toHaveBeenCalledTimes(1);
				expect(willUpdate).toHaveBeenCalledTimes(1);
			}
		}

		const app = new App(() => {
			expect(shouldUpdate).toHaveBeenCalledTimes(1);
			expect(willUpdate).toHaveBeenCalledTimes(1);
			expect(didUpdate).toHaveBeenCalledTimes(1);
			done();
		});
		expect(app).toBeDefined();
	});

	it('should trigger shouldUpdate with target and query', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const shouldUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			shouldUpdate(target, query) {
				expect(target).toBeDefined();
				expect(query).toBeDefined();
				expect(query.length).toBe(1);
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).toEqual(null);
				shouldUpdate();
			}
		}

		const app = new App(() => {
			expect(shouldUpdate).toHaveBeenCalledTimes(1);
			done();
		});
		expect(app).toBeDefined();
	});

	it('should allow shouldUpdate to cancel update', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const shouldUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			shouldUpdate(target, query) {
				expect(target).toBeDefined();
				expect(query).toBeDefined();
				expect(query.length).toBe(1);
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).toEqual(null);
				shouldUpdate();
				return false;
			}
		}

		const app = new App(() => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).toEqual(null);
			expect(shouldUpdate).toHaveBeenCalledTimes(1);
			done();
		});
		expect(app).toBeDefined();
	});

	it('should trigger willUpdate with target and query', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const willUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			willUpdate(target, query) {
				expect(target).toBeDefined();
				expect(query).toBeDefined();
				expect(query.length).toBe(1);
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).toEqual(null);
				willUpdate();
			}
		}

		const app = new App(() => {
			expect(willUpdate).toHaveBeenCalledTimes(1);
			done();
		});
		expect(app).toBeDefined();
	});

	it('should trigger didUpdate with target', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const didUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			didUpdate(target) {
				expect(target).toBeDefined();
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).not.toEqual(null);
				expect(componentLookup.length).toEqual(1);
				didUpdate();
			}
		}

		const app = new App(() => {
			expect(didUpdate).toHaveBeenCalledTimes(1);
			done();
		});

		expect(app).toBeDefined();
	});


	it('should trigger willUnmountHabitats', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const willUnmountHabitats = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			willUnmountHabitats() {
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).not.toEqual(null);
				expect(componentLookup.length).toEqual(1);
				expect(this.__container__.length).toEqual(1);
				willUnmountHabitats();
			}
		}

		const app = new App(() => {
			app.unmountHabitats();
			expect(willUnmountHabitats).toHaveBeenCalledTimes(1);
			done();
		});

		expect(app).toBeDefined();
	});

	it('should trigger didUnmountHabitats', (done) => {
		node.innerHTML = '<div data-component="IMockComponent"></div>';

		const didUnmountHabitats = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const containerBuilder = new ContainerBuilder();
				containerBuilder.register(MockComponent).as('IMockComponent');
				this.setContainer(containerBuilder.build(), cb);
			}

			didUnmountHabitats() {
				const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
				expect(componentLookup).toEqual(null);
				expect(this.__container__.length).toEqual(1);
				didUnmountHabitats();
			}
		}

		const app = new App(() => {
			app.unmountHabitats();
			expect(didUnmountHabitats).toHaveBeenCalledTimes(1);
			done();
		});

		expect(app).toBeDefined();
	});

});
