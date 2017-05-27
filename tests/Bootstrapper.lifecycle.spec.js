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

describe('Bootstrapper Lifecycle', () => {

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should trigger lifecycle events in order', (done) => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		const shouldUpdate = jasmine.createSpy();
		const willUpdate = jasmine.createSpy();
		const didUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const container = new Container();
				container.register('IMochComponent', MochComponent);
				this.setContainer(container, cb);
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

	it('should trigger shouldUpdate with target', (done) => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		const shouldUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const container = new Container();
				container.register('IMochComponent', MochComponent);
				this.setContainer(container, cb);
			}

			shouldUpdate(target) {
				expect(target).toBeDefined();
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
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
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		const shouldUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const container = new Container();
				container.register('IMochComponent', MochComponent);
				this.setContainer(container, cb);
			}

			shouldUpdate(target) {
				expect(target).toBeDefined();
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
				expect(componentLookup).toEqual(null);
				shouldUpdate();
				return false;
			}
		}

		const app = new App(() => {
			const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
			expect(componentLookup).toEqual(null);
			expect(shouldUpdate).toHaveBeenCalledTimes(1);
			done();
		});
		expect(app).toBeDefined();
	});

	it('should trigger willUpdate with target', (done) => {
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		const willUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const container = new Container();
				container.register('IMochComponent', MochComponent);
				this.setContainer(container, cb);
			}

			willUpdate(target) {
				expect(target).toBeDefined();
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
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
		node.innerHTML = '<div data-component="IMochComponent"></div>';

		const didUpdate = jasmine.createSpy();

		class App extends Bootstrapper {
			constructor(cb = null) {
				super();
				const container = new Container();
				container.register('IMochComponent', MochComponent);
				this.setContainer(container, cb);
			}

			didUpdate(target) {
				expect(target).toBeDefined();
				const componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);
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

});
