/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/**
 * The Container class
 */
var Container = (function () {
    /**
     * Constructor
     */
    function Container() {
        this._components = {};
    }
    /**
     * Register a new component
     * @param name
     * @param comp
     */
    Container.prototype.registerComponent = function (name, comp) {
        this._components[name] = comp;
    };
    /**
     * Returns a component for name
     * @param name
     * @returns {any}
     */
    Container.prototype.component = function (name) {
        return this._components[name];
    };
    return Container;
}());
exports.Container = Container;
