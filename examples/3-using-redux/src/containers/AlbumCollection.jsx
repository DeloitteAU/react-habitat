import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Album from '../components/Album';


class AlbumCollection extends React.Component {
	render() {
		return (
			<div>
				{!this.props.albums.length && <p><i>No albums to display. Why not add one above.</i></p>}
				{this.props.albums.map(a => <Album text={a} key={a} />)}
			</div>
		);
	}
}

AlbumCollection.propTypes = {
	albums: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	albums: state.albums,
});

export default connect(mapStateToProps, null)(AlbumCollection);
