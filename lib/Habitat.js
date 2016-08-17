'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Habitat = function () {
  function Habitat() {
    _classCallCheck(this, Habitat);
  }

  _createClass(Habitat, null, [{
    key: 'parseProps',


    /**
     * Returns a dictionary of properties and values defined on an element
     */
    value: function parseProps(ele) {
      // Default props with reference to the initiating node
      var props = {
        proxy: ele };

      // Populate custom props from reading any ele attributes that start with 'data-prop-'
      for (var i = 0; i < ele.attributes.length; i++) {
        var a = ele.attributes[i];

        if (a.name.indexOf('data-prop-') >= 0) {
          // Convert prop name from hyphens to camel case
          var name = a.name.replace('data-prop-', '').replace(/-([a-z])/g, firstLetterToUpper);

          var value = a.value || '';

          // Parse booleans
          if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
            value = false;
          }
          if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
            value = true;
          }

          // Parse json strings
          if (typeof value === 'string' && value.length > 2 && (value[0] === '{' && value[value.length - 1] === '}' || value[0] === '[' && value[value.length - 1] === ']')) {
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

  }, {
    key: 'create',
    value: function create(ele, type) {
      var tag = void 0;

      // If tag is a block level element, then replicate it with the portal
      switch (ele.tagName) {
        case 'span':
          tag = 'span';
          break;
        default:
          tag = 'div';
      }

      var habitat = window.document.createElement(tag);
      var className = ele.getAttribute('data-habitat-class') || null;

      // Keep references to habitats
      habitat.setAttribute('data-habitat', type);

      // Set habitat class name if any
      if (className) {
        habitat.className = '' + className;
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
  }]);

  return Habitat;
}();

exports.default = Habitat;