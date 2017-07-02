import React from 'react';
import PropTypes from 'prop-types';

class Featurette extends React.PureComponent {

	imageView() {
		return (
			<div className="col-md-5">
				<img src={this.props.imgSrc} alt="" />
			</div>
		);
	}

	textView() {
		return (
			<div className="col-md-7">
				<h2 className="featurette-heading">
					{this.props.title}
					<span className="text-muted">{this.props.subTitle}</span>
				</h2>
				<p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
			</div>
		);
	}

	render() {
		return (
			<div className="row">
				{this.props.layout === 'rtl' ? this.imageView() : this.textView()}
				{this.props.layout === 'rtl' ? this.textView() : this.imageView()}
			</div>
		);
	}

}

Featurette.defaultProps = {
	title: 'Donec ullamcorper nulla non',
	subTitle: 'Faucibus turpis porta',
	imgSrc: 'http://placehold.it/400x400',
	layout: 'ltr',
};

Featurette.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	imgSrc: PropTypes.string,
	layout: PropTypes.string,
};

export default Featurette;
