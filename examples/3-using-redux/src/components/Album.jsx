import React        from 'react';
import PropTypes    from 'prop-types';

class Album extends React.PureComponent {

	render() {
		return (
			<div className="card">
				<img src="http://lorempixel.com/356/280" alt="" />
				<p className="card-text">{this.props.text}</p>
			</div>
		);
	}

}

Album.defaultProps = {
	text: '',
};

Album.propTypes = {
	text: PropTypes.string,
};

export default Album;
