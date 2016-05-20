"use strict";
var Container = (function () {
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
    Container.prototype.getComponent = function (name) {
        return this._components[name];
    };
    return Container;
}());
exports.Container = Container;
