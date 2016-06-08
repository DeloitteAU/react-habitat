/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as React           from 'react';
import * as ReactDOM        from 'react-dom';

import {IDOMFactory}        from '../interfaces/IDOMFactory';

export class ReactDOMFactory implements IDOMFactory {

    identifier() {
      return 'React';
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
