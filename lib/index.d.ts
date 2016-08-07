/// <reference path="../typings/main.d.ts" />
import { Bootstrapper } from './Bootstrapper';
import { Container } from './Container';
import { _Mixin } from './classic/createBootstrapper';
declare const ReactHabitat: {
    Bootstrapper: typeof Bootstrapper;
    Container: typeof Container;
    createBoostrapper: (spec: {
        [id: string]: any;
    }) => _Mixin;
};
export default ReactHabitat;
