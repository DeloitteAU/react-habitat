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

class MockComponentTwo extends React.Component {

	innerText() {
		if (this.props.title !== null) {
			return `[component MockComponentTwo](title='${this.props.title}')`;
		}

		return '[component MockComponentTwo]';
	}

	render() {
		return <div>{this.innerText()}</div>;
	}

}

MockComponentTwo.propTypes = {
	title: PropTypes.string,
};

export default MockComponentTwo;
