import { IContainer } from './interfaces/IContainer';
export declare class Container implements IContainer {
    _components: {
        [id: string]: any;
    };
    constructor();
    registerComponent(name: string, comp: any): void;
    getComponent(name: string): any;
}
