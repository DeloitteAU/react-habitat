/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactHabitat 		from 'react-habitat';
import { createStore } 		from 'redux';

import ReduxDomFactory		from '../src/ReduxDomFactory';

import mockReducer	 		from './fixtures/mockReducer';
import MockContainer 		from './fixtures/MockContainer';


let node = null;

describe('Bootstrapper', () => {

	class App extends ReactHabitat.Bootstrapper {

		constructor(cb) {
			super();

			// Create a redux store
			const store = createStore(mockReducer);

			// Create a container builder
			const builder = new ReactHabitat.ContainerBuilder();

			// Set the factory to use our redux factory
			builder.factory = new ReduxDomFactory(store);

			// Register our moch component
			builder.register(MockContainer).as('IMockContainer');

			// Set the container
			this.setContainer(builder.build(), cb);
		}
	}

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
		node = null;
	});

	it('should render a component', done => {
		node.innerHTML = '<div data-component="IMockContainer"></div>';

		const app = new App(() => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			done();
		});

		expect(app).toBeDefined();
	});


	it('should update on provider changes', done => {
		node.innerHTML = '<div data-component="IMockContainer"></div>';

		const app = new App(() => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			const countBtn = document.getElementById('countBtn');

			expect(app).toBeDefined();
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(countBtn.innerText).toBe('0');

			countBtn.click();
			expect(countBtn.innerText).toBe('1');

			countBtn.click();
			expect(countBtn.innerText).toBe('2');

			countBtn.click();
			countBtn.click();
			expect(countBtn.innerText).toBe('4');

			done();
		});
	});

	it('should pass own props', done => {
		node.innerHTML = '<div data-component="IMockContainer" data-prop-prefix="BRAVO-"></div>';

		const app = new App(() => {
			const componentLookup = node.innerHTML.match(/\[component MockComponent\]/g);
			const countBtn = document.getElementById('countBtn');

			expect(app).toBeDefined();
			expect(componentLookup).not.toEqual(null);
			expect(componentLookup.length).toEqual(1);
			expect(countBtn.innerText).toBe('BRAVO-0');

			countBtn.click();
			expect(countBtn.innerText).toBe('BRAVO-1');

			countBtn.click();
			expect(countBtn.innerText).toBe('BRAVO-2');

			countBtn.click();
			countBtn.click();
			expect(countBtn.innerText).toBe('BRAVO-4');

			done();
		});
	});

});
