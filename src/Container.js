/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The Container class
 */
export default class Container {

  /**
   * Constructor
   */
  constructor(comps = {}) {

    if (typeof comps !== 'object') {
      throw new Error('Unexpected initial container.', comps);
    }

    // TODO: need to make this private (eg use a WeakMap)
    this._components = comps;
  }

	/**
     * Register a component in the container
     * @param {string}  name    - A unique component key
     * @param {object}  comp    - The component
     */
  registerComponent(name, comp) {
    if (typeof name !== 'string') {
      throw new Error('Unexpected component key. Expects a string.', name);
    }
    this._components[name] = comp;
  }

  /**
   * Resolve a component from the container
   * @param {string}    name    - The unique component key
   * @returns {object}
   */
  resolve(name) {
    return this._components[name];
  }

  getComponent(name) {
    console.warn('getComponent is deprecated. Please use resolve() instead.');
    return this.resolve(name);
  }
}
