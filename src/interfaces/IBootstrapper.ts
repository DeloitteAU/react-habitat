/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {IContainer} from './IContainer';
import {IDOMFactory} from "./IDOMFactory";

/**
 * The Bootstrapper interface
 */
export interface IBootstrapper {

    factory: IDOMFactory;

    setContainer:(container:IContainer) => void;


    //TODO: These are not implemented yet

    /**
     * Application did start event
     */
    appDidStart?:() => void;

    /**
     * Application will sleep event
     */
    appWillSleep?:() => void;

    /**
     * Application did awake event
     */
    appDidAwake?:() => void;

    /**
     * Application will terminate event
     */
    appWillTerminate?:() => void;


}
