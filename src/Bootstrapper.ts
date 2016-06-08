/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {IBootstrapper}            from "./interfaces/IBootstrapper";
import {IContainer}               from './interfaces/IContainer';
import {IDOMFactory}              from './interfaces/IDOMFactory';

import {Habitat}                  from './Habitat';
import {ReactDOMFactory}          from './factories/ReactDOMFactory';

/**
 *  Bootstrapper class
 */
export class Bootstrapper implements IBootstrapper {

    // Note for es5 support we cannot have the private accessor here
    _componentSelector: string;

    _container: IContainer;

    domFactory: IDOMFactory;

    firstClassElements: NodeListOf<Element>;


    /**
     * Constructor
     */
    constructor() {

        // Sanity check
        if (!window || (!window && !window.document)) {
            throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
        }

        // Set the DOM factory
        this.domFactory = new ReactDOMFactory();

        // Set the selector name space
        this._componentSelector = 'data-component';

        // Find all the elements in the dom with the component selector attribute
        this.firstClassElements = window.document.querySelectorAll(`[${this.componentSelector}]`);
    }

    /**
     * Get's the component selector, this is used
     * @returns {string}
     */
    get componentSelector():string {
        return this._componentSelector;
    }

    /**
     * Set the container
     * @param {IContainer} container - The container
     */
    setContainer(container: IContainer): void {

        // Save the container
        this._container = container;

        // Wire up the components from the container
        this._wireUpComponents();
    }

    /**
     * Wires up components inside the container
     * @private
     */
    _wireUpComponents():void {

        // Iterate over component elements in the dom
        for (var i = 0; i < this.firstClassElements.length; ++i) {

            var ele = this.firstClassElements[i],
                componentName = ele.getAttribute(this._componentSelector),
                component = this._container.getComponent(componentName);

            if (!component) {
                console.warn(`Cannot resolve component "${componentName}". Did you forget to register it in the container?`);
                continue;
            }

            this.domFactory.inject(
              component,
              Habitat.parseProps(ele),
              Habitat.createHabitat(ele, this.domFactory.identifier()));
        }

    }

}
