"use strict";
var DOMUtils_1 = require('./utils/DOMUtils');
var ReactFactory_1 = require('./factories/ReactFactory');
var Bootstrapper = (function () {
    /**
     * Constructor
     */
    function Bootstrapper() {
        // Sanity check
        if (!window || (!window && !window.document)) {
            throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
        }
        this._componentSelector = 'data-component';
        this.firstClassElements = window.document.querySelectorAll("[" + this.componentSelector + "]");
    }
    Object.defineProperty(Bootstrapper.prototype, "componentSelector", {
        /**
         * Get's the component selector, this is used
         * @returns {string}
         */
        get: function () {
            return this._componentSelector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the react container
     * @param {IContainer} container - The container
     */
    Bootstrapper.prototype.setContainer = function (container) {
        this._container = container;
        this._wireUpReactComponents();
    };
    /**
     * Wires up components inside the container
     * @private
     */
    Bootstrapper.prototype._wireUpReactComponents = function () {
        // Iterate over component elements in the dom
        for (var i = 0; i < this.firstClassElements.length; ++i) {
            var ele = this.firstClassElements[i], componentName = ele.getAttribute(this._componentSelector), component = this._container.getComponent(componentName);
            if (!component) {
                console.warn("Cannot resolve component \"" + componentName + "\". Did you forget to register it in the container?");
                continue;
            }
            var props = DOMUtils_1.DOMUtils.parseProps(ele) || {};
            var portal = DOMUtils_1.DOMUtils.openPortal(ele);
            debugger;
            ReactFactory_1.ReactFactory.inject(component, props, portal);
        }
    };
    return Bootstrapper;
}());
exports.Bootstrapper = Bootstrapper;
