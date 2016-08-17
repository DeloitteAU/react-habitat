/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default class ReactDomFactory {

  /**
   * The factory identifier
   * @returns {string}
   */
  identifier() {
    return 'react';
  }

  inject(module, props = {}, target) {
    if (target) {
      ReactDOM.render(
        React.createElement(module, props || {}),
        target
      );
    } else {
      console.warn('Target element is null or undefined. Cannot inject component');
    }
  }
}
