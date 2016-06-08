import { IContainer } from './IContainer';
export interface IBootstrapper {
    setContainer: (container: IContainer) => void;
    appDidStart?: () => void;
    appWillSleep?: () => void;
    appDidAwake?: () => void;
    appWillTerminate?: () => void;
}
