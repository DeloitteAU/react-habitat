import {IContainer} from './IContainer';

export interface IBootstrapper {


    setContainer:(container:IContainer) => void;

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

