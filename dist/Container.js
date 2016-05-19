"use strict";
class Container {
    constructor() {
        this._components = {};
    }
    /**
     * Register a new component
     * @param name
     * @param comp
     */
    registerComponent(name, comp) {
        this._components['name'] = comp;
    }
    /**
     * Returns a component for name
     * @param name
     * @returns {any}
     */
    getComponent(name) {
        return this._components['name'];
    }
}
exports.Container = Container;
