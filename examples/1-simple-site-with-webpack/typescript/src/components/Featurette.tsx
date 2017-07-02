import * as React from 'react';
import { IFeaturetteProps } from './IFeaturetteProps';

class Featurette extends React.Component<IFeaturetteProps> {

	public static defaultProps: Partial<IFeaturetteProps> = {
		title: 'Donec ullamcorper nulla non',
		subTitle: 'Faucibus turpis porta',
		imgSrc: 'http://placehold.it/400x400',
		layout: 'ltr',
	};

	imageView(){
		return (
			<div className="col-md-5">
				<img src={this.props.imgSrc} />
			</div>
		);
	}

	textView(){
		return (
			<div className="col-md-7">
				<h2 className="featurette-heading">
					{this.props.title}
					<span className="text-muted">{this.props.subTitle}</span>
				</h2>
				<p className="lead">
					Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.
					Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
				</p>
			</div>
		);
	}

	render() {
		switch (this.props.layout) {
			case 'rtl':
				return (
					<div className="row">
						{this.textView()}
						{this.imageView()}
					</div>
				);
			default:
			case 'ltr':
				return (
					<div className="row">
						{this.imageView()}
						{this.textView()}
					</div>
				);
		}
	}

}

export default Featurette;