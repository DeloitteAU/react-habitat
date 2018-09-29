'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Habitat = require('./Habitat');

var _Habitat2 = _interopRequireDefault(_Habitat);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_HABITAT_SELECTOR = 'data-component';

/**
 * Safe callback wrapper
 * @param {null|function}		cb			- The callback
 * @param {object}				context		- The context of the callback
 * @param {...object}			args		- Arguments to apply
 * @private
 */
function _callback(cb, context) {
	if (typeof cb === 'function') {
		for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			args[_key - 2] = arguments[_key];
		}

		cb.call.apply(cb, [context].concat(args));
	}
}

/**
 *  Bootstrapper class
 */

var Bootstrapper = function () {

	/**
  * Constructor
  */
	function Bootstrapper() {
		_classCallCheck(this, Bootstrapper);

		// Sanity check
		if (!window || !window && !window.document) {
			throw new Error('React Habitat requires a window but cannot see one :(');
		}

		/**
   * The DOM component selector
   * @type {string}
   */
		this.componentSelector = DEFAULT_HABITAT_SELECTOR;

		/**
   * The container
   * Slashes to avoid super collisions
   * @type {Container|null}
   * @private
   */
		this.__container__ = null;
	}

	/**
  * Apply the container to nodes
  * @param {array}		nodes				- The elements to parse
  * @param {function}	[cb=null]			- Optional callback
  * @private
  */


	_createClass(Bootstrapper, [{
		key: '_apply',
		value: function _apply(nodes) {
			var _this = this;

			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			// const factory = container.domFactory();
			// const id = container.id();
			var resolveQueue = [];

			// Iterate over component elements in the dom

			var _loop = function _loop(i) {
				var ele = nodes[i];

				// Ignore elements that have already been connected
				if (_Habitat2.default.hasHabitat(ele)) {
					return 'continue';
				}

				// Resolve components using promises
				var componentName = ele.getAttribute(_this.componentSelector);
				resolveQueue.push(_this.__container__.resolve(componentName, _this).then(function (registration) {
					// This is an expensive operation so only do on non prod builds
					if (process.env.NODE_ENV !== 'production') {
						if (ele.querySelector('[' + _this.componentSelector + ']')) {
							_Logger2.default.warn('RHW08', 'Component should not contain any nested components.', ele);
						}
					}

					// Generate props
					var props = _Habitat2.default.parseProps(ele);
					if (registration.meta.defaultProps) {
						props = Object.assign({}, registration.meta.defaultProps, props);
					}

					// Options
					var options = registration.meta.options || {};

					// Inject the component
					_this.__container__.factory.inject(registration.component, props, _Habitat2.default.create(ele, _this.__container__.id, options));
				}).catch(function (err) {
					_Logger2.default.error('RHW01', 'Cannot resolve component "' + componentName + '" for element.', err, ele);
				}));
			};

			for (var i = 0; i < nodes.length; ++i) {
				var _ret = _loop(i);

				if (_ret === 'continue') continue;
			}

			// Trigger callback when all promises are finished
			// regardless if some fail
			Promise.all(resolveQueue.map(function (p) {
				return p.catch(function (e) {
					return e;
				});
			})).then(function () {
				_callback(cb);
			}).catch(function (err) {
				// We should never get here.. if we do this is a bug
				throw err;
			});
		}

		/**
   * Set the container
   * @param {object}    container   - The container
   * @param {function}  [cb=null]   - Optional callback
   */

	}, {
		key: 'setContainer',
		value: function setContainer(container) {
			var _this2 = this;

			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (this.__container__ !== null) {
				_Logger2.default.error('RHW02', 'A container is already set. ' + 'Please call dispose() before assigning a new one.');
				return;
			}

			if (!container.factory || typeof container.factory.inject !== 'function' || typeof container.factory.dispose !== 'function') {
				_Logger2.default.error('RHE10', 'Incompatible factory');
				return;
			}

			// Set the container
			this.__container__ = container;

			// Wire up the components from the container
			this.update(null, function () {
				_callback(cb, _this2);
			});
		}

		/**
   * The container
   * @returns {Container}
   */

	}, {
		key: 'update',


		/**
  * Apply the container to an updated dom structure
  * @param {node}		node		- Target node to parse or null for entire document body
  * @param {function}		[cb=null]	- Optional callback
  */
		value: function update(node) {
			var _this3 = this;

			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			// Check if we have a container before attempting an update
			if (!this.__container__) {
				_callback(cb);
				return;
			}

			var target = node || window.document.body;
			var query = target.querySelectorAll('[' + this.componentSelector + ']');

			if (!query.length) {
				// Nothing to update
				return;
			}

			// Lifecycle event
			// Hook to allow developers to cancel operation
			if (typeof this.shouldUpdate === 'function') {
				if (this.shouldUpdate(target, query) === false) {
					_callback(cb, this);
					return;
				}
			}

			// Lifecycle event
			if (typeof this.willUpdate === 'function') {
				this.willUpdate(target, query);
			}

			this._apply(query, function () {
				// Lifecycle event
				if (typeof _this3.didUpdate === 'function') {
					_this3.didUpdate(target);
				}

				_callback(cb, _this3);
			});
		}

		/**
   * Unmount all habitat instances for the container
   * @param {function}	[cb=null]	- Optional callback
   */

	}, {
		key: 'unmountHabitats',
		value: function unmountHabitats() {
			var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


			// Lifecycle event
			if (typeof this.willUnmountHabitats === 'function') {
				this.willUnmountHabitats();
			}

			// Get open habitats for this container
			var habitats = _Habitat2.default.listHabitats(this.__container__.id);

			// Clean up
			for (var i = 0; i < habitats.length; ++i) {
				this.__container__.factory.dispose(habitats[i]);
				_Habitat2.default.destroy(habitats[i]);
			}

			// Lifecycle event
			if (typeof this.didUnmountHabitats === 'function') {
				this.didUnmountHabitats();
			}

			// Handle callback
			_callback(cb, this);
		}

		/**
   * Dispose the container and destroy habitat instances
   * @param {function}	[cb=null]	- Optional callback
   */

	}, {
		key: 'dispose',
		value: function dispose() {
			var _this4 = this;

			var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			this.unmountHabitats(function () {
				// Reset and release
				_this4.__container__ = null;

				// Lifecycle event
				if (typeof _this4.didDispose === 'function') {
					_this4.didDispose();
				}

				// Handle callback
				_callback(cb, _this4);
			});
		}
	}, {
		key: 'container',
		get: function get() {
			return this.__container__;
		}
	}]);

	return Bootstrapper;
}();

exports.default = Bootstrapper;
module.exports = exports['default'];