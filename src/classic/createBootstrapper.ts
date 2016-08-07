/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IBootstrapper}    from '../interfaces/IBootstrapper';
import {Bootstrapper}     from '../Bootstrapper';
import {Container}        from '../Container';

/*
* Mixin class used for extending the classic spec
* @private
*/
export class _Mixin extends Bootstrapper {

  /*
  * A Constructor that takes a spec
  */
  constructor(spec: {[id : string] : any }){

      super();

      // Check if a container spec was supplied
      if(!spec['container']){
        console.warn('"Container" property was not supplied');
        return;
      }

      // Create a new container
      var container = new Container();

      // Iterate the spec and register its components
      for(var definition of spec['container']) {
        container.registerComponent(
          definition['register'],
          definition['for']);
      }

      // Finally, set the container
      this.setContainer(container);
  }


}

/*
*
*/
export const createBootstrapper = function(spec: {[id: string] : any}) {
    return new _Mixin(spec);
};
