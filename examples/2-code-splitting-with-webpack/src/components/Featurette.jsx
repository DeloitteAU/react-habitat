import React from 'react';

class Featurette extends React.Component {

	imageView(){
		return (
			<div className="col-md-5">
				<img src={this.props.imgSrc} />
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
	imgSrc: 'http://placehold.it/400x400',
	layout: 'ltr',
};


export default Featurette;
