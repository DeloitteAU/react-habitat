/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import PropTypes from 'prop-types';

class MockComponent extends React.Component {

	innerText() {
		if (this.props.title !== null) {
			return `[component MockComponent](title='${this.props.title}')`;
		}

		return '[component MockComponent]';
	}

	render() {
		return <div>{this.innerText()}</div>;
	}
}

MockComponent.propTypes = {
	title: PropTypes.string,
};

export default MockComponent;
