webpackJsonp([2],{

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _reactHabitat = __webpack_require__(138);

var _reactHabitat2 = _interopRequireDefault(_reactHabitat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_ReactHabitat$Bootstr) {
  _inherits(Main, _ReactHabitat$Bootstr);

  function Main() {
    _classCallCheck(this, Main);

    // Create a new container
    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

    var container = new _reactHabitat2.default.Container();

    // Register our components that we want to expose to the DOM
    container.register('RBanner', __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 489)));
    container.register('RFeaturette', __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 490)));

    // Set the DOM container
    _this.setContainer(container, function () {
      // Optionally start a dom watcher to automatically wire up any new elements
      // that may be injected later (eg ajaxed HTML)
      // See dynamic.html for demo of this
      _this.startWatcher();
    });
    return _this;
  }

  return Main;
}(_reactHabitat2.default.Bootstrapper);

var main = exports.main = new Main();

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(202);


/***/ })

},[487]);