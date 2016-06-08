import { IBootstrapper } from "./interfaces/IBootstrapper";
import { IContainer } from './interfaces/IContainer';
import { IDOMFactory } from './interfaces/IDOMFactory';
export declare class Bootstrapper implements IBootstrapper {
    _componentSelector: string;
    _container: IContainer;
    domFactory: IDOMFactory;
    firstClassElements: NodeListOf<Element>;
    constructor();
    readonly componentSelector: string;
    setContainer(container: IContainer): void;
    _wireUpComponents(): void;
}
