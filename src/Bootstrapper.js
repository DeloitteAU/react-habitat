/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Habitat from './Habitat';
import ReactDomFactory from './factories/ReactDomFactory';

const DEFAULT_HABITAT_SELECTOR = 'data-component';

/**
 * Parses a container and populate components
 * @param {object}    factory               The dom factory
 * @param {array}     container             The container
 * @param {array}     elements              The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param cb
 */
function parseContainer(factory, container, elements, componentSelector, cb = null) {
  // Iterate over component elements in the dom
  for (let i = 0; i < elements.length; ++i) {
    const ele = elements[i];
    const componentName = ele.getAttribute(componentSelector);
    const component = container.resolve(componentName);

    if (component) {
      factory.inject(
        component,
        Habitat.parseProps(ele),
        Habitat.create(ele, factory.identifier()));
    } else {
      console.warn(`Cannot resolve component "${componentName}"`);
    }
  }

  if (typeof cb === 'function') {
    cb.call();
  }
}

/**
 *  Bootstrapper class
 */
export default class Bootstrapper {

  /**
   * Constructor
   */
  constructor() {
    // Sanity check
    if (!window || (!window && !window.document)) {
      throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
    }

    // Set dom component selector
    this.componentSelector = DEFAULT_HABITAT_SELECTOR;

    // Set dom factory
    this.factory = new ReactDomFactory();

    // Find all the elements in the dom with the component selector attribute
    this.elements = window.document.body.querySelectorAll(`[${this.componentSelector}]`);
  }

  /**
   * Set the container
   * @param {object}    container   - The container
   * @param {function}  [cb=null]   - Optional callback
   */
  setContainer(container, cb = null) {
    // Wire up the components from the container
    parseContainer(
        this.factory,
        container,
        this.elements,
        this.componentSelector,
        cb
    );
  }

}
