/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React           from 'react';
import * as ReactDOM        from 'react-dom';

import {IDomFactory}        from '../interfaces/IDomFactory';

export class ReactDomFactory implements IDomFactory {

    identifier() {
      return 'react';
    }

    inject(module: any, props: {}, target: Element) {

        if(target){
            ReactDOM.render(
                React.createElement(module, props || {}),
                target
            );
        } else {
          console.warn('Target element is null or undefined. Cannot inject component');
        }
    }
}
