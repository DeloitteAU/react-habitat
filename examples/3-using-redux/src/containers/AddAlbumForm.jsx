import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlbum } from '../actions';

class AddAlbumForm extends React.PureComponent {

	constructor(props) {
		super(props);

		this._txtName = null;
		this._txtNamRef = (r) => { this._txtName = r; };

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit(e) {
		e.preventDefault();
		if (this._txtName) {
			this.props.onAddAlbum(this._txtName.value);
			this._txtName.value = '';
		}
	}

	render() {
		return (
			<form onSubmit={this._handleSubmit} className="form-inline">
				<div className="form-group mx-sm-3">
					<input type="text" ref={this._txtNamRef} className="form-control" placeholder="Album name" />
				</div>
				<button type="submit" className="btn btn-primary">Add Album</button>
			</form>
		);
	}
}

AddAlbumForm.propTypes = {
	onAddAlbum: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddAlbum: (title) => {
			dispatch(addAlbum(title));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddAlbumForm);
