/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Container 			from '../src/Container';
import MochComponent 		from './mochs/MochComponent';
import MochComponentTwo 	from './mochs/MochComponentTwo';

let container = null;

describe('Container', () => {
	beforeEach(() => {
		container = new Container();
	});

	it('does construct', () => {
		expect(container).toBeDefined();
	});

	it('does register components', () => {
		container.register('aComponent', MochComponent);

		expect(container).toBeDefined();
		expect(container.resolve('aComponent')).toBe(MochComponent);
	});

	it('does register multiple components', () => {

		const testContainer = new Container();
		testContainer.registerAll({
			aComponent: MochComponent,
			anotherComponent: MochComponentTwo,
		});

		expect(testContainer).toBeDefined();
		expect(testContainer.resolve('aComponent')).toBe(MochComponent);
		expect(testContainer.resolve('anotherComponent')).toBe(MochComponentTwo);
	});


	it('does override registered components', () => {
		container.register('aComponent', MochComponent);
		container.register('aComponent', MochComponentTwo);

		expect(container).toBeDefined();
		expect(container.resolve('aComponent')).toBe(MochComponentTwo);
	});


	it('does resolve distinct components', () => {
		container.register('aComponent', MochComponent);
		container.register('aComponent2', MochComponentTwo);

		expect(container.resolve('aComponent')).toBe(MochComponent);
		expect(container.resolve('aComponent2')).toBe(MochComponentTwo);
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
