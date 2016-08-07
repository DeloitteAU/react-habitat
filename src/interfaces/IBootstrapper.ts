/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IContainer} from './IContainer';
import {IDomFactory} from "./IDomFactory";

/**
 * The Bootstrapper interface
 */
export interface IBootstrapper {

    factory: IDomFactory;

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