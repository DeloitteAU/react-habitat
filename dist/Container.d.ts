import { IContainer } from './interfaces/IContainer';
export declare class Container implements IContainer {
    private _components;
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
