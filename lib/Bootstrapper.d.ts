/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IBootstrapper } from "./interfaces/IBootstrapper";
import { IContainer } from './interfaces/IContainer';
import { IDomFactory } from './interfaces/IDomFactory';
/**
 *  Bootstrapper class
 */
export declare class Bootstrapper implements IBootstrapper {
    /**
     * The dom container
     * Note for es5 support we cannot have the private accessor here
     */
    _container: IContainer;
    /**
     * The component selector namespace
     */
    componentSelector: string;
    /**
     * The dom factory
     * @type {ReactDOMFactory}
     */
    factory: IDomFactory;
    /**
     * The raw dom elements
     */
    firstClassElements: NodeListOf<Element>;
    /**
     * Constructor
     */
    constructor();
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
