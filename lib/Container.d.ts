/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IContainer } from './interfaces/IContainer';
/**
 * The Container class
 */
export declare class Container implements IContainer {
    /**
     *  A dictionary to hold references to registered components
     */
    _components: {
        [id: string]: any;
    };
    /**
     * Constructor
     */
    constructor();
    /**
     * Register a new component
     * @param name
     * @param comp
     */
    registerComponent(name: string, comp: any): void;
    /**
     * Returns a component for name
     * @param name
     * @returns {any}
     */
    component(name: string): any;
}
