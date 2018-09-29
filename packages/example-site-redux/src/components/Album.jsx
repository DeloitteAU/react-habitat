import React        from 'react';
import PropTypes    from 'prop-types';

class Album extends React.PureComponent {

	render() {
		const date = new Date(); // Cache buster
		return (
			<div className="card">
				<img src={`https://picsum.photos/356/280/?random&t=${encodeURI(date.toString())}`} alt="Album Art" />
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
