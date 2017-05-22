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
 * @private
 */
function _callback(cb) {
	if (typeof cb === 'function') {
		cb();
	}
}

/**
 * Apply a container to nodes and populate components
 * @param {array}     container             The container
 * @param {array}     nodes              	The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param {function}  [cb=null]   			- Optional callback
 * @private
 */
function _applyContainer(container, nodes, componentSelector) {
	var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


	// Bail out early if no elements to parse
	if (!nodes || !nodes.length) {
		_callback(cb);
		return;
	}

	var factory = container.domFactory();
	var id = container.id();

	// Iterate over component elements in the dom
	for (var i = 0; i < nodes.length; ++i) {
		var ele = nodes[i];

		// Ignore elements that have already been connected
		if (_Habitat2.default.hasHabitat(ele)) {
			continue;
		}

		var componentName = ele.getAttribute(componentSelector);
		var component = container.resolve(componentName);
		if (component) {
			// Expensive operation, only do on non prod builds
			if (process.env.NODE_ENV !== 'production') {
				if (ele.querySelector('[' + componentSelector + ']')) {
					_Logger2.default.warn('RHW08', 'Component should not contain any nested components.', ele);
				}
			}

			// Inject the component
			factory.inject(component, _Habitat2.default.parseProps(ele), _Habitat2.default.create(ele, id));
		} else {
			_Logger2.default.error('RHW01', 'Cannot resolve component "' + componentName + '" for element.', ele);
		}
	}

	_callback(cb);
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
   * If true, the container will be applied to dom mutations automatically. True by default.
   * i.e update(*addedNodes*)
   * @type {boolean}
   */
		this.enableWatcher = true;

		/**
   * The container
   * @type {Container|null}
   * @private
   */
		this._container = null;

		/**
   * The watcher's observer instance or null
   * @type {MutationObserver|null}
   * @private
   */
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
			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			if (this._container !== null) {
				_Logger2.default.error('RHW02', 'A container is already set. ' + 'Please call dispose() before assigning a new one.');
				return;
			}

			// Set the container
			this._container = container;

			// Wire up the components from the container
			this.update(null, function () {
				_callback(cb);
			});
		}

		/**
  * Apply the container to an updated dom structure
  * @param {node}		node		- Target node to parse or null for entire document body
  * @param {function}		[cb=null]	- Optional callback
  */

	}, {
		key: 'update',
		value: function update(node) {
			var _this = this;

			var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			// Check if we have a container before attempting an update
			if (!this._container) {
				_callback(cb);
				return;
			}

			_callback(this.domWillUpdate);

			// Temporarily stop the watcher from triggering due to Habitat injections
			// Note: This could possibly miss some dom changes during parse time.. bug maybe?
			this.stopWatcher();

			_applyContainer(this._container, node || window.document.body.querySelectorAll('[' + this.componentSelector + ']'), this.componentSelector, function () {
				// Restart the dom watcher unless disabled
				if (_this.enableWatcher) {
					_this.startWatcher();
				}

				_callback(cb);
				_callback(_this.domDidUpdate);
			});
		}

		/**
   * Start DOM watcher for auto wire ups
   */

	}, {
		key: 'startWatcher',
		value: function startWatcher() {
			// If disabled, do nothing
			if (!this.enableWatcher) {
				return;
			}

			// Feature available?
			if (typeof MutationObserver === 'undefined') {
				_Logger2.default.warn('RHWXX', 'MutationObserver not available');

				// Auto disable it so it dosnt attempt to start again
				this.enableWatcher = false;
				return;
			}

			// Create observer if not assigned already
			if (!this._observer) {
				this._observer = new MutationObserver(this._handleDomMutation.bind(this));
			}

			// Start observing for dom changes filtered by our component selector
			this._observer.observe(window.document.body, {
				childList: true,
				attributes: true,
				subtree: true,
				attributeOldValue: false,
				characterData: false,
				characterDataOldValue: false,
				attributeFilter: [this.componentSelector]
			});
		}

		/**
   * Stop the DOM watcher if running
   */

	}, {
		key: 'stopWatcher',
		value: function stopWatcher() {
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
				// Only run update if nodes have been added
				var diff = mutationRecord.filter(function (r) {
					return r.addedNodes.length;
				});
				if (diff.length) {
					this.update();
				}
			} else {
				// Fallback
				this.update();
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


			// Stop dom watcher if any
			this.stopWatcher();

			// get the container's factory
			var factory = this._container.domFactory();

			// Look up open habitats for this container in the dom
			var habitats = window.document.body.querySelectorAll('[data-habitat="' + this._container.id() + '"]');

			// Clean up
			for (var i = 0; i < habitats.length; ++i) {
				factory.dispose(habitats[i]);
				_Habitat2.default.destroy(habitats[i]);
			}

			// Reset and release
			this._container = null;
			this._elements = null;
			this._observer = null;

			// Handle callback
			_callback(cb, this);
		}
	}]);

	return Bootstrapper;
}();

exports.default = Bootstrapper;
module.exports = exports['default'];