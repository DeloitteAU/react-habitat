'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registration = function () {
	function Registration(operator) {
		_classCallCheck(this, Registration);

		if (typeof operator !== 'function') {
			//TODO: ERROR CODE
			_Logger2.default.error('RHE', 'Unexpected operator.', operator);
			return;
		}

		this.key = null;
		this.operator = operator;

		this.meta = {};
	}

	_createClass(Registration, [{
		key: 'as',
		value: function as(key) {
			if (typeof key !== 'string') {
				throw new Error('Unexpected key. Expects a string.');
			}
			this.key = key;

			return this;
		}
	}, {
		key: 'withDefaultProps',
		value: function withDefaultProps(props) {
			this.meta.defaultProps = props;
			return this;
		}
	}, {
		key: 'withOptions',
		value: function withOptions(options) {
			this.meta.options = options;
			return this;
		}
	}]);

	return Registration;
}();

exports.default = Registration;
module.exports = exports['default'];