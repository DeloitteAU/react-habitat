/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Registration			from '../src/Registration';

describe('Registration', () => {

	it('should construct with operator', () => {
		const operator = new Promise((resolve) => { resolve(); });
		const registration = new Registration(operator);

		expect(registration.operator).toEqual(operator);
	});

	it('should set the key', () => {
		const operator = new Promise((resolve) => { resolve(); });
		const registration = new Registration(operator).as('KEY');

		expect(registration.operator).toEqual(operator);
		expect(registration.key).toBe('KEY');
	});

	it('should set the habitat options', () => {
		const operator = new Promise((resolve) => { resolve(); });
		const options = {};
		const registration = new Registration(operator).withOptions(options);

		expect(registration.meta.options).toEqual(options);
	});

	it('should set the react default props', () => {
		const operator = new Promise((resolve) => { resolve(); });
		const props = {};
		const registration = new Registration(operator).withDefaultProps(props);

		expect(registration.meta.defaultProps).toEqual(props);
	});
});
