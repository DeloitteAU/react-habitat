/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The Habitat class
 */
export declare class Habitat {
    /**
     * Returns a dictionary of properties and values defined on an element
     */
    static parseProps(ele: Element): {
        [id: string]: any;
    };
    /**
     * Creates a new habitat in the dom
     */
    static createHabitat(ele: Element, type: string): Element;
}
