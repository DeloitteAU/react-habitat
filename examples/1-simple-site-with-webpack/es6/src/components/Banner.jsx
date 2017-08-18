import React        from 'react';
import PropTypes    from 'prop-types';

class Banner extends React.PureComponent {

	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<h1>{this.props.title}</h1>
					<p>
						This page demonstrates how to embed multiple react components into a
						page using React Habitat.
					</p>
					<p>
						This banner and the following featurettes
						are all React Components. View this page source or Check out index.html in a text editor to see
						how they are implemented
					</p>
					<p>
						<a className="btn btn-primary btn-lg" href="https://github.com/DeloitteDigitalAPAC/react-habitat" target="_blank">Check out the docs »</a>
					</p>
				</div>
			</div>
		);
	}

}

Banner.defaultProps = {
	title: 'Welcome',
};

Banner.propTypes = {
	title: PropTypes.string,
};

export default Banner;
