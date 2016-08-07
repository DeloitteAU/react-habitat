/// <reference path='../typings/main.d.ts'/>
import { Bootstrapper as _Bootstrapper }                            from './Bootstrapper';
import { Container as _Container }                                  from './Container';
import { createBootstrapper as _createBoostrapper, _Mixin }         from './classic/createBootstrapper';


export const Bootstrapper = _Bootstrapper;
export const Container = _Container;
export const createBoostrapper = _createBoostrapper;

export default {
    Bootstrapper,
    Container,
    createBoostrapper
};