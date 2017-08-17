/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContainerBuilder			from '../../src/builder/ContainerBuilder';
import ReactDomFactory          from '../../src/factories/ReactDomFactory';
import Container                from '../../src/Container';

import MockComponent            from '../mocks/MockComponent';
import MockComponentTwo         from '../mocks/MockComponentTwo';

describe('ContainerBuilder', () => {

	it('should build', () => {
		const containerBuilder = new ContainerBuilder();
		const container = containerBuilder.build();
		expect(container).toEqual(jasmine.any(Container));
	});

	it('should have default factory', () => {
		const containerBuilder = new ContainerBuilder();
		const container = containerBuilder.build();
		expect(container.factory).toBe(ReactDomFactory);
	});

	it('should set a new factory', () => {
		const MockFactory = function() {
			this.inject = () => {};
			this.dispose = () => {};
		};

		const factory = new MockFactory();

		const containerBuilder = new ContainerBuilder();
		containerBuilder.factory = factory;
		const container = containerBuilder.build();
		expect(container.factory).toBe(factory);
	});

	it('should build registrations', (done) => {
		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('aComponent');
		const container = containerBuilder.build();

		expect(container.length).toBe(1);

		container.resolve('aComponent').then((r) => {
			expect(r.component).toBe(MockComponent);
			done();
		});
	});

	it('should build async registrations', (done) => {
		const containerBuilder = new ContainerBuilder();
		containerBuilder.registerAsync(new Promise((resolve) => {
			setTimeout(() => {
				resolve(MockComponent);
			}, 200);
		})).as('aComponent');
		const container = containerBuilder.build();

		expect(container.length).toBe(1);

		container.resolve('aComponent').then((r) => {
			expect(r.component).toBe(MockComponent);
			done();
		});
	});


	it('does resolve distinct components', (done) => {

		const containerBuilder = new ContainerBuilder();
		containerBuilder.register(MockComponent).as('aComponent');
		containerBuilder.register(MockComponentTwo).as('aComponent2');

		const container = containerBuilder.build();

		const t1 = container.resolve('aComponent').then((r) => {
			expect(r.component).toBe(MockComponent);
		});

		const t2 = container.resolve('aComponent2').then((r) => {
			expect(r.component).toBe(MockComponentTwo);
		});

		Promise.all([t1, t2]).then(done);
	});

});
