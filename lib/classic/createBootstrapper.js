'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._Mixin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createBootstrapper = createBootstrapper;

var _Bootstrapper2 = require('../Bootstrapper');

var _Bootstrapper3 = _interopRequireDefault(_Bootstrapper2);

var _ContainerBuilder = require('../builder/ContainerBuilder');

var _ContainerBuilder2 = _interopRequireDefault(_ContainerBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/*
* Mixin class used for extending the classic spec
* @private
*/
var _Mixin = exports._Mixin = function (_Bootstrapper) {
	_inherits(_Mixin, _Bootstrapper);

	/*
 * A Constructor that takes a spec
 */
	function _Mixin(spec, callback) {
		_classCallCheck(this, _Mixin);

		// Check if a container spec was supplied
		var _this = _possibleConstructorReturn(this, (_Mixin.__proto__ || Object.getPrototypeOf(_Mixin)).call(this));

		if (!spec.container) {
			console.warn('"Container" property was not supplied');
			return _possibleConstructorReturn(_this);
		}

		// Set the component selector if defined
		if (spec.componentSelector) {
			_this.componentSelector = spec.componentSelector;
		}

		// Set the watcher value if defined
		if (typeof spec.enableWatcher === 'boolean') {
			_this.enableWatcher = spec.enableWatcher;
		}

		// Create a new container
		var containerBuilder = new _ContainerBuilder2.default(spec.defaultOptions || null);

		// Map the components
		for (var i = 0; i < spec.container.length; i++) {
			var registration = void 0;
			if (spec.container[i].forAsync) {
				registration = containerBuilder.registerAsync(spec.container[i].forAsync).as(spec.container[i].register);
			} else {
				registration = containerBuilder.register(spec.container[i].for).as(spec.container[i].register);
			}

			if (spec.container[i].withDefaultProps) {
				registration.withDefaultProps(spec.container[i].withDefaultProps);
			}

			if (spec.container[i].withOptions) {
				registration.withOptions(spec.container[i].withOptions);
			}
		}

		_this._shouldUpdateProxy = spec.shouldUpdate || null;
		_this._willUpdateProxy = spec.willUpdate || null;
		_this._didUpdateProxy = spec.didUpdate || null;
		_this._willUnmountProxy = spec.willUnmountHabitats || null;
		_this._didUnmountProxy = spec.didUnmountHabitats || null;
		_this._didDisposeProxy = spec.didDispose || null;

		// Finally, set the container
		_this.setContainer(containerBuilder.build(), function () {
			if (typeof callback === 'function') {
				callback();
			}
		});
		return _this;
	}

	_createClass(_Mixin, [{
		key: 'shouldUpdate',
		value: function shouldUpdate(node) {
			if (this._shouldUpdateProxy) {
				this._shouldUpdateProxy(node);
			}
		}
	}, {
		key: 'willUpdate',
		value: function willUpdate() {
			if (this._willUpdateProxy) {
				this._willUpdateProxy();
			}
		}
	}, {
		key: 'didUpdate',
		value: function didUpdate() {
			if (this._didUpdateProxy) {
				this._didUpdateProxy();
			}
		}
	}, {
		key: 'willUnmountHabitats',
		value: function willUnmountHabitats() {
			if (this._willUnmountProxy) {
				this._willUnmountProxy();
			}
		}
	}, {
		key: 'didUnmountHabitats',
		value: function didUnmountHabitats() {
			if (this._didUnmountProxy) {
				this._didUnmountProxy();
			}
		}
	}, {
		key: 'didDispose',
		value: function didDispose() {
			if (this._didDisposeProxy) {
				this._didDisposeProxy();
			}
		}
	}]);

	return _Mixin;
}(_Bootstrapper3.default);

/*
* The classic bootstrapper
*/


function createBootstrapper(spec) {
	var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	return new _Mixin(spec, cb);
}