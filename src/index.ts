/// <reference path='../typings/main.d.ts'/>
import { Bootstrapper }                 from './Bootstrapper';
import { Container }                    from './Container';
import { createBootstrapper, _Mixin }   from './classic/createBootstrapper';

const ReactHabitat = {

    // Modern

    Bootstrapper: Bootstrapper,
    Container: Container,

    // Classic
    
    createBoostrapper: createBootstrapper

};

export default ReactHabitat;