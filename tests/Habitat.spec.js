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
    node.setAttribute('data-prop-user', '{"name": "John Citizen", "isActive": true, "age": 22}');

    const results = Habitat.parseProps(node);

    expect(results.user).toBeDefined();
    expect(results.user.name).toEqual('John Citizen');
    expect(results.user.isActive).toEqual(true);
    expect(results.user.age).toEqual(22);
  });
});
