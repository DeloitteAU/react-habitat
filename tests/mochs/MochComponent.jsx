/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';

class MochComponent extends React.Component {

  innerText() {
    if (this.props.title !== null) {
      return `[component MochComponent](title='${this.props.title}')`;
    }

    return '[component MochComponent]';
  }

  render() {
    return <div>{this.innerText()}</div>;
  }
}

MochComponent.propTypes = {
  title: React.PropTypes.string,
};

export default MochComponent;
