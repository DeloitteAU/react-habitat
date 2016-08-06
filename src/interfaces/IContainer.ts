/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * The container interface
 */
export interface IContainer {

    /**
     * Register a new component in the container
     * @param {string}      name        - The key that identifies this component
     * @param {*}           comp        - The component class
     */
    registerComponent:(name:string, comp:any) =>  void;

    /**
     * Get a registered component for a key
     * @param {string}      name        - The key name of the component that has been registered
     */
    component:(name:string) => any;
    
}
