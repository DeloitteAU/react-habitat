webpackJsonp([0],{

/***/ 490:
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

var Featurette = function (_React$Component) {
    _inherits(Featurette, _React$Component);

    function Featurette() {
        _classCallCheck(this, Featurette);

        return _possibleConstructorReturn(this, (Featurette.__proto__ || Object.getPrototypeOf(Featurette)).apply(this, arguments));
    }

    _createClass(Featurette, [{
        key: "imageView",
        value: function imageView() {
            return _react2.default.createElement(
                "div",
                { className: "col-md-5" },
                _react2.default.createElement("img", { src: this.props.imgSrc })
            );
        }
    }, {
        key: "textView",
        value: function textView() {
            return _react2.default.createElement(
                "div",
                { className: "col-md-7" },
                _react2.default.createElement(
                    "h2",
                    { className: "featurette-heading" },
                    this.props.title,
                    _react2.default.createElement(
                        "span",
                        { className: "text-muted" },
                        this.props.subTitle
                    )
                ),
                _react2.default.createElement(
                    "p",
                    { className: "lead" },
                    "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo."
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "row" },
                this.props.layout === 'rtl' ? this.imageView() : this.textView(),
                this.props.layout === 'rtl' ? this.textView() : this.imageView()
            );
        }
    }]);

    return Featurette;
}(_react2.default.Component);

Featurette.defaultProps = {
    title: 'Donec ullamcorper nulla non',
    imgSrc: 'http://placehold.it/400x400',
    layout: 'ltr'
};

exports.default = Featurette;

/***/ })

});