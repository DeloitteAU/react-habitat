/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Container 			from '../src/Container';
import MochComponent 		from './mochs/MockComponent';
import MochComponentTwo 	from './mochs/MockComponentTwo';

let container = null;

describe('Container', () => {
	beforeEach(() => {
		container = new Container();
	});

	it('does construct', () => {
		expect(container).toBeDefined();
	});

	it('does register components', (done) => {
		container.register('aComponent', MochComponent);

		expect(container).toBeDefined();
		container.resolve('aComponent').then((component) => {
			expect(component).toBe(MochComponent);
			done();
		});
	});

	it('does register multiple components', (done) => {

		const testContainer = new Container();
		testContainer.registerAll({
			aComponent: MochComponent,
			anotherComponent: MochComponentTwo
		});

		expect(testContainer).toBeDefined();

		const t1 = testContainer.resolve('aComponent').then((component) => {
			expect(component).toBe(MochComponent);
		});

		const t2 = testContainer.resolve('anotherComponent').then((component) => {
			expect(component).toBe(MochComponentTwo);
		});

		Promise.all([t1, t2]).then(done);
	});


	it('does override registered components', (done) => {
		container.register('aComponent', MochComponent);
		container.register('aComponent', MochComponentTwo);

		expect(container).toBeDefined();

		container.resolve('aComponent').then((component) => {
			expect(component).toBe(MochComponentTwo);
			done();
		});
	});


	it('does resolve distinct components', (done) => {
		container.register('aComponent', MochComponent);
		container.register('aComponent2', MochComponentTwo);

		const t1 = container.resolve('aComponent').then((component) => {
			expect(component).toBe(MochComponent);
		});

		const t2 = container.resolve('aComponent2').then((component) => {
			expect(component).toBe(MochComponentTwo);
		});

		Promise.all([t1, t2]).then(done);
	});

	it('does return valid id', () => {
		expect(container.id()).toBeDefined();
		expect(typeof container.id()).toBe('string');
		expect(container.id()).not.toBe('');
	});

	it('does self assign unique id', () => {
		const containerB = new Container();
		expect(container.id()).not.toBe(containerB.id());
	});

	it('does return dom factory', () => {
		expect(container.domFactory()).toBeDefined();
	});

});
