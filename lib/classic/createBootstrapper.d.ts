import { Bootstrapper } from '../Bootstrapper';
export declare class _Mixin extends Bootstrapper {
    constructor(spec: {
        [id: string]: any;
    });
}
export declare const createBootstrapper: (spec: {
    [id: string]: any;
}) => _Mixin;
