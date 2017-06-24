webpackJsonp([1],{

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(91);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_React$Component) {
    _inherits(Banner, _React$Component);

    function Banner(props) {
        _classCallCheck(this, Banner);

        return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));
    }

    _createClass(Banner, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "jumbotron" },
                _react2.default.createElement(
                    "div",
                    { className: "container" },
                    _react2.default.createElement(
                        "h1",
                        null,
                        this.props.title
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "This page demonstrates how to embed multiple react components into a page using React Habitat."
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "This banner and the following featurettes are all React Components. Check out index.html in a text editor to see how they are implemented."
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        _react2.default.createElement(
                            "a",
                            { className: "btn btn-primary btn-lg", href: "https://github.com/DeloitteDigitalAPAC/react-habitat", target: "_blank" },
                            "Check out the docs \xBB"
                        )
                    )
                )
            );
        }
    }]);

    return Banner;
}(_react2.default.Component);

Banner.defaultProps = {
    title: 'Welcome'
};

exports.default = Banner;

/***/ })

});