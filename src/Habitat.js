/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

function firstLetterToUpper(input) {
  return input[1].toUpperCase();
}

/**
 * The Habitat provider class
 */
export default class Habitat {

  /**
   * Returns a dictionary of properties and values defined on an element
   */
  static parseProps(ele) {
    // Default props with reference to the initiating node
    const props = {
      proxy: ele,  // Pass in a reference to the original node
    };

    // Populate custom props from reading any ele attributes that start with 'data-prop-'
    for (let i = 0; i < ele.attributes.length; i++) {
      const a = ele.attributes[i];

      if (a.name.indexOf('data-prop-') >= 0) {
        // Convert prop name from hyphens to camel case
        const name = a.name
            .replace('data-prop-', '')
            .replace(/-([a-z])/g, firstLetterToUpper);

        let value = a.value || '';

        // Parse booleans
        if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') { value = false; }
        if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') { value = true; }

        // Parse json strings
        if (typeof value === 'string' && value.length > 2 &&
            ((value[0] === '{' && value[value.length - 1] === '}') ||
            (value[0] === '[' && value[value.length - 1] === ']'))) {
          value = JSON.parse(value);
        }

        props[name] = value;
      }
    }

    return props;
  }


  /**
   * Creates a new habitat in the dom
   */
  static create(ele, type) {
    let tag;

    // If tag is a block level element, then replicate it with the portal
    switch (ele.tagName) {
      case 'span':
        tag = 'span';
        break;
      default:
        tag = 'div';
    }

    const habitat = window.document.createElement(tag);
    const className = ele.getAttribute('data-habitat-class') || null;

    // Keep references to habitats
    habitat.setAttribute('data-habitat', type);

    // Set habitat class name if any
    if (className) {
      habitat.className = `${className}`;
    }

    // inject habitat
    if (ele === window.document.body) {
      document.body.appendChild(habitat);
    } else {
      ele.parentNode.insertBefore(habitat, ele.nextSibling);
    }

    // Determine if we should keep target element in the dom
    if (ele.tagName !== 'input' || ele.tagName !== 'textarea') {
      // Not an input so assumed we dont need to keep the targe
      // element around
      ele.parentNode.removeChild(ele);
    } else {
      // The element is an input, leave it in the
      // dom to allow passing data back to the backend again but we can
      // hide it
      ele.setAttribute('style', 'display:none;');
    }

    return habitat;
  }
}
