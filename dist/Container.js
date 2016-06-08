"use strict";
var Container = (function () {
    function Container() {
        this._components = {};
    }
    Container.prototype.registerComponent = function (name, comp) {
        this._components[name] = comp;
    };
    Container.prototype.getComponent = function (name) {
        return this._components[name];
    };
    return Container;
}());
exports.Container = Container;
