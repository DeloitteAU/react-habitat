webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var ReactHabitat = __webpack_require__(2);

	// Our top level components
	var Banner = __webpack_require__(176);
	var Featurette = __webpack_require__(209);


	function MyApp() {

	    // Create a new react habitat bootstrapper
	    this.domContainer = ReactHabitat.createBootstrapper({

	        // Create a new container
	        container: [

	            // Register your top level component(s)
	            {register: 'RBanner', for: Banner},
	            {register: 'RFeaturette', for: Featurette}
	        ]
	    });

	}

	// Always export a 'new' instance so it immediately evokes
	exports.MyApp = new MyApp();

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(177);

	var Banner = React.createClass({displayName: "Banner",

	    render: function() {
	        return (
	            React.createElement("div", {className: "jumbotron"}, 
	                React.createElement("div", {className: "container"}, 
	                    React.createElement("h1", null, this.props.title), 
	                    React.createElement("p", null, 
	                        "This page demonstrates how to embed multiple react components into a" + " " +
	                        "page using React Habitat."
	                    ), 
	                    React.createElement("p", null, "This banner and the following featurettes" + " " +
	                        "are all React Components. Check out index.html in a text editor to see" + " " +
	                        "how they are implemented."), 
	                    React.createElement("p", null, 
	                        React.createElement("a", {className: "btn btn-primary btn-lg", href: "https://github.com/DeloitteDigitalAPAC/react-habitat", target: "_blank"}, "Check out the docs »")
	                    )
	                )
	            )
	        );
	    }

	});


	module.exports = Banner;

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(177);

	var Featurette = React.createClass({displayName: "Featurette",

	    imageView: function() {
	        return (
	            React.createElement("div", {className: "col-md-5"}, 
	                React.createElement("img", {src: this.props.imgSrc})
	            )
	        );
	    },

	    textView: function() {
	        return (
	            React.createElement("div", {className: "col-md-7"}, 
	                React.createElement("h2", {className: "featurette-heading"}, 
	                    this.props.title, 
	                    React.createElement("span", {className: "text-muted"}, this.props.subTitle)
	                ), 
	                React.createElement("p", {className: "lead"}, "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis" + " " +
	                    "euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus," + " " +
	                    "tellus ac cursus commodo.")
	            )
	        );
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "row"}, 
	                this.props.layout === 'rtl' ? this.imageView() : this.textView(), 
	                this.props.layout === 'rtl' ? this.textView() : this.imageView()
	            )
	        );
	    }

	});


	module.exports = Featurette;

/***/ }

});