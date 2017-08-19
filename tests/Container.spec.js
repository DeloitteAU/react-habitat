/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Container 			from '../src/Container';

let container = null;

describe('Container', () => {
	beforeEach(() => {
		container = new Container();
	});

	it('does construct', () => {
		expect(container).toBeDefined();
	});

	it('does return valid id', () => {
		expect(container.id).toBeDefined();
		expect(typeof container.id).toBe('string');
		expect(container.id).not.toBe('');
	});

	it('does self assign unique id', () => {
		const containerB = new Container();
		expect(container.id).not.toBe(containerB.id);
	});

	it('does return factory', () => {
		expect(container.factory).toBeDefined();
	});

});
