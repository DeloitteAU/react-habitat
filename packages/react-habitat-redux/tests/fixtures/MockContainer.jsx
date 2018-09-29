/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React 			from 'react';
import PropTypes 		from 'prop-types';
import { connect } 		from 'react-redux';
import { increment } 	from './MockActions';

class MockContainer extends React.PureComponent {
	render() {
		const { value, onIncrement, prefix } = this.props;

		return (
			<div>
				<span>[component MockComponent]</span>
				<button id="countBtn" onClick={onIncrement}>{prefix}{value}</button>
			</div>
		);
	}
}

MockContainer.defaultProps = {
	prefix: null,
};

MockContainer.propTypes = {
	value: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	prefix: PropTypes.string,
};

const mapStateToProps = (state) => ({
	value: state.count,
});

const mapDispatchToProps = (dispatch) => ({
	onIncrement: () => dispatch(increment(1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MockContainer);

