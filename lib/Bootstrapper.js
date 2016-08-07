/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var Habitat_1 = require('./Habitat');
var ReactDomFactory_1 = require('./factories/ReactDomFactory');
/**
 *  Bootstrapper class
 */
var Bootstrapper = (function () {
    /**
     * Constructor
     */
    function Bootstrapper() {
        /**
         * The component selector namespace
         */
        this.componentSelector = 'data-component';
        /**
         * The dom factory
         * @type {ReactDOMFactory}
         */
        this.factory = new ReactDomFactory_1.ReactDomFactory();
        // Sanity check
        if (!window || (!window && !window.document)) {
            throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
        }
        // Find all the elements in the dom with the component selector attribute
        this.firstClassElements = window.document.body.querySelectorAll("[" + this.componentSelector + "]");
    }
    /**
     * Set the container
     * @param {IContainer} container - The container
     */
    Bootstrapper.prototype.setContainer = function (container) {
        // Save the container
        this._container = container;
        // Wire up the components from the container
        this._wireUpComponents();
    };
    /**
     * Wires up components inside the container
     * @private
     */
    Bootstrapper.prototype._wireUpComponents = function () {
        // Iterate over component elements in the dom
        for (var i = 0; i < this.firstClassElements.length; ++i) {
            var ele = this.firstClassElements[i], componentName = ele.getAttribute(this.componentSelector), component = this._container.component(componentName);
            if (!component) {
                console.warn("Cannot resolve component \"" + componentName + "\". Did you forget to register it in the container?");
                continue;
            }
            this.factory.inject(component, Habitat_1.Habitat.parseProps(ele), Habitat_1.Habitat.createHabitat(ele, this.factory.identifier()));
        }
    };
    return Bootstrapper;
}());
exports.Bootstrapper = Bootstrapper;
