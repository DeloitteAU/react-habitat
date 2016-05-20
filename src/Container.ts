import {IContainer} from './interfaces/IContainer'

/**
 * The Container class
 */
export class Container implements IContainer {

    /**
     *  A dictionary to hold references to registered components
     */
    _components: { [id: string] : any; };

    /**
     * Constructor
     */
    constructor() {
        this._components = {};
    }

    /**
     * Register a new component
     * @param name
     * @param comp
     */
    registerComponent(name:string, comp: any) {
      this._components[name] = comp;
    }

    /**
     * Returns a component for name
     * @param name
     * @returns {any}
     */
    getComponent(name:string) {
      return this._components[name];
    }

}
