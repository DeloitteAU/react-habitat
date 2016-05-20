import {IContainer} from './IContainer';

/**
 * The Bootstrapper interface
 */
export interface IBootstrapper {


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

