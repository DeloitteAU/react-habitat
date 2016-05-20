import {IContainer} from './interfaces/IContainer'
import {Registration} from './models/Registration';

export class Container implements IContainer {

    _components: { [id: string] : any; };

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
