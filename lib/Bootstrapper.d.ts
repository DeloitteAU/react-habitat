/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IBootstrapper } from "./interfaces/IBootstrapper";
import { IContainer } from './interfaces/IContainer';
import { IDOMFactory } from './interfaces/IDOMFactory';
/**
 *  Bootstrapper class
 */
export declare class Bootstrapper implements IBootstrapper {
    _componentSelector: string;
    _container: IContainer;
    domFactory: IDOMFactory;
    firstClassElements: NodeListOf<Element>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Get's the component selector, this is used
     * @returns {string}
     */
    componentSelector: string;
    /**
     * Set the container
     * @param {IContainer} container - The container
     */
    setContainer(container: IContainer): void;
    /**
     * Wires up components inside the container
     * @private
     */
    _wireUpComponents(): void;
}
