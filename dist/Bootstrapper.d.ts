import { IBootstrapper } from "./interfaces/IBootstrapper";
import { IContainer } from './interfaces/IContainer';
import { IDOMFactory } from './interfaces/IDOMFactory';
export declare class Bootstrapper implements IBootstrapper {
    _componentSelector: string;
    _container: IContainer;
    domFactory: IDOMFactory;
    firstClassElements: NodeListOf<Element>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Get's the component selector, this is used
     * @returns {string}
     */
    componentSelector: string;
    /**
     * Set the react container
     * @param {IContainer} container - The container
     */
    setContainer(container: IContainer): void;
    /**
     * Wires up components inside the container
     * @private
     */
    _wireUpReactComponents(): void;
}
