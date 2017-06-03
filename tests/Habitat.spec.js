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


	it('should parse simple props', () => {
		node.setAttribute('data-prop-name', 'John Citizen');

		const results = Habitat.parseProps(node);

		expect(results.name).toEqual('John Citizen');
	});


	it('should converts hyphen props to camel case', () => {
		node.setAttribute('data-prop-first-name', 'John');
		node.setAttribute('data-prop-first-name-initial', 'J');

		const results = Habitat.parseProps(node);

		expect(results.firstName).toEqual('John');
		expect(results.firstNameInitial).toEqual('J');
	});


	it('should parses booleans', () => {
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

	it('should parses null strings', () => {
		node.setAttribute('data-prop-address', 'null');

		const results = Habitat.parseProps(node);

		expect(results.address).toEqual(null);
	});


	it('should parses json object', () => {
		node.setAttribute('data-prop-user',
			'{"name": "John Citizen", "isActive": true, "age": 22}');

		const results = Habitat.parseProps(node);

		expect(results.user).toBeDefined();
		expect(results.user.name).toEqual('John Citizen');
		expect(results.user.isActive).toEqual(true);
		expect(results.user.age).toEqual(22);
	});

	it('should parses json array', () => {
		node.setAttribute('data-prop-users',
			'[{"name": "John"},{"name": "Sue"}]');

		const results = Habitat.parseProps(node);

		expect(results.users).toBeDefined();
		expect(results.users.length).toEqual(2);
		expect(results.users[0].name).toEqual('John');
		expect(results.users[1].name).toEqual('Sue');
	});

	it('should parses empty json array', () => {
		node.setAttribute('data-prop-users', '[]');

		const results = Habitat.parseProps(node);

		expect(results.users).toBeDefined();
		expect(typeof results.users).not.toEqual('string');
		expect(results.users.length).toEqual(0);
	});

	it('should parse empty json objects', () => {
		node.setAttribute('data-prop-user', '{}');

		const results = Habitat.parseProps(node);

		expect(results.user).toBeDefined();
		expect(typeof results.user).toEqual('object');
	});

	it('should parse json', () => {
		node.setAttribute('data-props',
			'{"user": {"name": "John Citizen", "isActive": true, "age": 22}}');

		const results = Habitat.parseProps(node);

		expect(results.user).toBeDefined();
		expect(results.user.name).toEqual('John Citizen');
		expect(results.user.isActive).toEqual(true);
		expect(results.user.age).toEqual(22);
	});


	it('should parse numbers', () => {
		node.setAttribute('data-n-prop-amount', '300');
		node.setAttribute('data-n-prop-amount2', '300.43');
		node.setAttribute('data-n-prop-amount3', 'abcd');

		const results = Habitat.parseProps(node);

		expect(results.amount).toBeDefined();
		expect(results.amount2).toBeDefined();
		expect(results.amount3).toBeDefined();
		expect(results.amount).toEqual(300);
		expect(results.amount2).toEqual(300.43);
		expect(results.amount3).toEqual(NaN);
	});


	it('should parse references', () => {

		// Our global variable
		const myStates = window.myStates = ['VIC','QLD','NT', 'NSW', 'ACT', 'WA', 'SA', 'TAS'];

		// Pass it in by the reference attribute
		node.setAttribute('data-r-prop-states', 'myStates');

		const results = Habitat.parseProps(node);

		expect(results.states).toBeDefined();
		expect(results.states).toBe(myStates);
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
