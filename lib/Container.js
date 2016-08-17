'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Container = function () {

  /**
   * Constructor
   */
  function Container() {
    var comps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Container);

    if ((typeof comps === 'undefined' ? 'undefined' : _typeof(comps)) !== 'object') {
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


  _createClass(Container, [{
    key: 'registerComponent',
    value: function registerComponent(name, comp) {
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

  }, {
    key: 'resolve',
    value: function resolve(name) {
      return this._components[name];
    }
  }, {
    key: 'getComponent',
    value: function getComponent(name) {
      console.warn('getComponent is deprecated. Please use resolve() instead.');
      return this.resolve(name);
    }
  }]);

  return Container;
}();

exports.default = Container;