import * as React from 'react';
import { IBannerProps } from './IBannerProps';

class Banner extends React.Component<IBannerProps> {

	public static defaultProps: Partial<IBannerProps> = {
		title: 'Welcome'
	};

	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<h1>{this.props.title}</h1>
					<p>
						This page demonstrates how to embed multiple react components into a
						page using React Habitat.
					</p>
					<p>This banner and the following featurettes
						are all React Components. Check out index.html in a text editor to see
						how they are implemented.</p>
					<p>
						<a className="btn btn-primary btn-lg" href="https://github.com/DeloitteDigitalAPAC/react-habitat" target="_blank">Check out the docs »</a>
					</p>
				</div>
			</div>
		);
	}

}

export default Banner;