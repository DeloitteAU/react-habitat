var React = require('react');

var Featurette = React.createClass({

    imageView: function() {
        return (
            <div className="col-md-5">
                <img src={this.props.imgSrc} />
            </div>
        );
    },

    textView: function() {
        return (
            <div className="col-md-7">
                <h2 className="featurette-heading">
                    {this.props.title}
                    <span className="text-muted">{this.props.subTitle}</span>
                </h2>
                <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis
                    euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus,
                    tellus ac cursus commodo.</p>
            </div>
        );
    },

    render: function() {
        return (
            <div className="row">
                {this.props.layout === 'rtl' ? this.imageView() : this.textView()}
                {this.props.layout === 'rtl' ? this.textView() : this.imageView()}
            </div>
        );
    }

});


module.exports = Featurette;