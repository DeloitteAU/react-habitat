/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Habitat from '../src/Habitat';

let node = null;

describe('Habitat parse', () => {
	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});


	it('parse simple props', () => {
		node.setAttribute('data-prop-name', 'John Citizen');

		const results = Habitat.parseProps(node);

		expect(results.name).toEqual('John Citizen');
	});


	it('converts hyphen props to camel case', () => {
		node.setAttribute('data-prop-first-name', 'John');
		node.setAttribute('data-prop-first-name-initial', 'J');

		const results = Habitat.parseProps(node);

		expect(results.firstName).toEqual('John');
		expect(results.firstNameInitial).toEqual('J');
	});


	it('parses booleans', () => {
		node.setAttribute('data-prop-is-active', 'true');
		node.setAttribute('data-prop-is-active2', 'True');
		node.setAttribute('data-prop-is-active3', 'TruE');
		node.setAttribute('data-prop-is-active4', 'TRUE');

		node.setAttribute('data-prop-is-active5', 'false');
		node.setAttribute('data-prop-is-active6', 'False');
		node.setAttribute('data-prop-is-active7', 'FalsE');
		node.setAttribute('data-prop-is-active8', 'FALSE');

		const results = Habitat.parseProps(node);

		expect(results.isActive).toEqual(true);
		expect(results.isActive2).toEqual(true);
		expect(results.isActive3).toEqual(true);
		expect(results.isActive4).toEqual(true);
		expect(results.isActive5).toEqual(false);
		expect(results.isActive6).toEqual(false);
		expect(results.isActive7).toEqual(false);
		expect(results.isActive8).toEqual(false);
	});


	it('parses json', () => {
		node.setAttribute('data-prop-user',
			'{"name": "John Citizen", "isActive": true, "age": 22}');

		const results = Habitat.parseProps(node);

		expect(results.user).toBeDefined();
		expect(results.user.name).toEqual('John Citizen');
		expect(results.user.isActive).toEqual(true);
		expect(results.user.age).toEqual(22);
	});

	it('parses json props', () => {
		node.setAttribute('data-props',
			'{"user": {"name": "John Citizen", "isActive": true, "age": 22}}');

		const results = Habitat.parseProps(node);

		expect(results.user).toBeDefined();
		expect(results.user.name).toEqual('John Citizen');
		expect(results.user.isActive).toEqual(true);
		expect(results.user.age).toEqual(22);
	});
});

describe('Habitat create', () => {

	beforeEach(() => {
		node = document.createElement('div');
		window.document.body.appendChild(node);
	});

	afterEach(() => {
		window.document.body.removeChild(node);
	});

	it('should create a habitat with identifier', () => {

		const testElement = window.document.createElement('div');

		node.appendChild(testElement);

		Habitat.create(testElement, 'C01');

		const habitatLookup = node.querySelectorAll('[data-habitat="C01"]');

		expect(habitatLookup.length).toEqual(1);

	});

	it('should throw non empty target error', () => {

		const testElement = window.document.createElement('div');
		testElement.innerHTML = '<p>test</p>';

		node.appendChild(testElement);

		function test() { Habitat.create(testElement, 'C01'); }

		expect(test).toThrowError();

	});

	it('should leave inputs in the dom', () => {

		const testElement = window.document.createElement('input');
		testElement.setAttribute('type', 'text');
		testElement.setAttribute('id', 'inpTest');

		node.appendChild(testElement);

		Habitat.create(testElement, 'C01');

		const habitatLookup = window.document.getElementById('inpTest');

		expect(habitatLookup).toEqual(testElement);

	});

	it('should leave elements in the dom with no-replace flag set to true', () => {

		const testElement = window.document.createElement('div');
		testElement.setAttribute('data-habitat-no-replace', 'true');
		testElement.setAttribute('id', 'eleTest');

		node.appendChild(testElement);

		Habitat.create(testElement, 'C01');

		const habitatLookup = window.document.getElementById('eleTest');

		expect(habitatLookup).toEqual(testElement);

	});

	it('should remove elements from the dom with no-replace flag set to false', () => {

		const testElement = window.document.createElement('div');
		testElement.setAttribute('data-habitat-no-replace', 'false');
		testElement.setAttribute('id', 'eleTest');

		node.appendChild(testElement);

		Habitat.create(testElement, 'C01');

		const habitatLookup = window.document.getElementById('eleTest');

		expect(habitatLookup).toEqual(null);

	});
});
