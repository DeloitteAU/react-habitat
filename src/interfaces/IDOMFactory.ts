/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The DOM Factory
 */
export interface IDomFactory {

    /**
     * An identifier string for the type of components this injects
     */
    identifier: () => string;

    /**
     * The inject method after a wire-up has been requested
     * @param {*}           module      - The component
     * @param {object}      props       - The components properties
     * @param {Element}     target      - The element to inject the component into
     */
    inject: (module: any, props: {}, target: Element) => void;

}
