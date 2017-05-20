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
 * Parses a container and populate components
 * @param {array}     container             The container
 * @param {array}     elements              The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param cb
 */
function parseContainer(container, elements, componentSelector) {
	var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	console.log('Running Parser ---- ');

	// Bail out early if no elements to parse
	if (!elements || !elements.length) {
		if (typeof cb === 'function') {
			cb();
		}
		return;
	}

	var factory = container.domFactory();
	var id = container.id();

	// Iterate over component elements in the dom
	for (var i = 0; i < elements.length; ++i) {
		var ele = elements[i];
		if (!_Habitat2.default.hasHabitat(ele)) {
			var componentName = ele.getAttribute(componentSelector);
			var component = container.resolve(componentName);
			if (component) {
				if (process.env.NODE_ENV !== 'production') {
					// Expensive operation, only do on non prod builds
					if (ele.querySelector('[' + componentSelector + ']')) {
						_Logger2.default.warn('RHW08', 'Component should not contain any nested components.', ele);
					}
				}
				factory.inject(component, _Habitat2.default.parseProps(ele), _Habitat2.default.create(ele, id));
			} else {
				_Logger2.default.error('RHW01', 'Cannot resolve component "' + componentName + '" for element.', ele);
			}
		}
	}

	if (typeof cb === 'function') {
		cb();
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

		// Set dom component selector
		this.componentSelector = DEFAULT_HABITAT_SELECTOR;

		// The container
		this._container = null;

		// Dom mutation observer
		this.enableDomWatcher = true;
		this._observer = null;
	}

	/**
  * Set the container
  * @param {object}    container   - The container
  * @param {function}  [cb=null]   - Optional callback
  */


	_createClass(Bootstrapper, [{
		key: 'setContainer',
		value: function setContainer(container) {
			var _this = this;

			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			if (this._container !== null) {
				_Logger2.default.error('RHW02', 'A container is already set. ' + 'Please call dispose() before assigning a new one.');
				return;
			}

			// Set the container
			this._container = container;

			// Wire up the components from the container
			parseContainer(this._container, window.document.body.querySelectorAll('[' + this.componentSelector + ']'), this.componentSelector, function () {

				console.log('callback');
				// Start the dom watcher unless disabled
				if (_this.enableDomWatcher) {
					console.log('starting watcher');
					_this.startDomWatcher();
				}

				// Callback
				if (typeof cb === 'function') {
					cb();
				}
			});
		}

		/**
  * Apply the container to an updated dom structure
  * This should be triggered anytime HTML has been ajaxed in
  * @param {node}		node		- Target node to parse or null for entire document body
  * @param {function}  	[cb=null]   - Optional callback
  */

	}, {
		key: 'domDidUpdate',
		value: function domDidUpdate(node) {
			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (this._container === null) {
				return;
			}

			parseContainer(this._container, node || window.document.body.querySelectorAll('[' + this.componentSelector + ']'), this.componentSelector, cb);
		}
	}, {
		key: 'startDomWatcher',
		value: function startDomWatcher(node) {
			// Feature available?
			if (typeof MutationObserver === 'undefined') {
				_Logger2.default.warn('RHWXX', 'MutationObserver not available');
				return;
			}

			// Create observer if not assigned already
			if (!this._observer) {
				this._observer = new MutationObserver(this._handleDomMutation.bind(this));
			}

			// Start observing for dom changes filtered by our component selector
			this._observer.observe(node || window.document.body, {
				childList: true,
				attributes: true,
				subtree: true,
				attributeFilter: [this.componentSelector]
			});
		}
	}, {
		key: 'stopDomWatcher',
		value: function stopDomWatcher() {
			if (this._observer && this._observer.disconnect) {
				this._observer.disconnect();
			}
		}

		/**
  * Handle dom mutation event
  * @param {MutationRecord}		mutationRecord		- The mutation record
  */

	}, {
		key: '_handleDomMutation',
		value: function _handleDomMutation(mutationRecord) {
			if (typeof mutationRecord !== 'undefined') {
				this.domDidUpdate(mutationRecord.addedNodes);
			} else {
				// Polyfill Fallback
				this.domDidUpdate();
			}
		}

		/**
   * Dispose the container and destroy habitat instances
   * @param {function}	[cb=null]	- Optional callback
   */

	}, {
		key: 'dispose',
		value: function dispose() {
			var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


			// get the container's factory
			var factory = this._container.domFactory();

			// Look up open habitats for this container in the dom
			var habitats = window.document.body.querySelectorAll('[data-habitat="' + this._container.id() + '"]');

			// Clean up
			for (var i = 0; i < habitats.length; ++i) {
				factory.dispose(habitats[i]);
				_Habitat2.default.destroy(habitats[i]);
			}

			// Stop dom watcher if any
			this.stopDomWatcher();

			// Reset and release
			this._container = null;
			this._elements = null;
			this._observer = null;

			// Handle callback
			if (typeof cb === 'function') {
				cb.call();
			}
		}
	}]);

	return Bootstrapper;
}();

exports.default = Bootstrapper;
module.exports = exports['default'];