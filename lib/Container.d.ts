import { IContainer } from './interfaces/IContainer';
/**
 * The Container class
 */
export declare class Container implements IContainer {
    /**
     *  A dictionary to hold references to registered components
     */
    _components: {
        [id: string]: any;
    };
    /**
     * Constructor
     */
    constructor();
    /**
     * Register a new component
     * @param name
     * @param comp
     */
    registerComponent(name: string, comp: any): void;
    /**
     * Returns a component for name
     * @param name
     * @returns {any}
     */
    getComponent(name: string): any;
}
