'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._Mixin = undefined;
exports.createBootstrapper = createBootstrapper;

var _Bootstrapper2 = require('../Bootstrapper');

var _Bootstrapper3 = _interopRequireDefault(_Bootstrapper2);

var _Container = require('../Container');

var _Container2 = _interopRequireDefault(_Container);

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
	function _Mixin(spec) {
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

		// Create a new container
		var container = new _Container2.default();

		// Map the components
		for (var i = 0; i < spec.container.length; i++) {
			container.register(spec.container[i].register, spec.container[i].for);
		}

		// Finally, set the container
		_this.setContainer(container);
		return _this;
	}

	return _Mixin;
}(_Bootstrapper3.default);

/*
* The classic bootstrapper
*/


function createBootstrapper(spec) {
	return new _Mixin(spec);
}