/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IBootstrapper}            from "./interfaces/IBootstrapper";
import {IContainer}               from './interfaces/IContainer';
import {IDomFactory}              from './interfaces/IDomFactory';

import {Habitat}                  from './Habitat';
import {ReactDomFactory}          from './factories/ReactDomFactory';

/**
 *  Bootstrapper class
 */
export class Bootstrapper implements IBootstrapper {
    
    /**
     * The dom container
     * Note for es5 support we cannot have the private accessor here
     */
    _container: IContainer;


    /**
     * The component selector namespace
     */
    componentSelector: string = 'data-component';


    /**
     * The dom factory
     * @type {ReactDOMFactory}
     */
    factory: IDomFactory = new ReactDomFactory();

    /**
     * The raw dom elements
     */
    firstClassElements: NodeListOf<Element>;


    /**
     * Constructor
     */
    constructor() {

        // Sanity check
        if (!window || (!window && !window.document)) {
            throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
        }

        // Find all the elements in the dom with the component selector attribute
        this.firstClassElements = window.document.body.querySelectorAll(`[${this.componentSelector}]`);
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
    _wireUpComponents(): void {

        // Iterate over component elements in the dom
        for (var i = 0; i < this.firstClassElements.length; ++i) {

            var ele = this.firstClassElements[i],
                componentName = ele.getAttribute(this.componentSelector),
                component = this._container.component(componentName);

            if (!component) {
                console.warn(`Cannot resolve component "${componentName}". Did you forget to register it in the container?`);
                continue;
            }

            this.factory.inject(
              component,
              Habitat.parseProps(ele),
              Habitat.createHabitat(ele, this.factory.identifier()));
        }

    }

}
