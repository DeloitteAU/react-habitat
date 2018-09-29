'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HABITAT_PROP_REF = exports.HABITAT_PROP_NUMBER = exports.HABITAT_PROP_JSON = exports.HABITAT_PROP = exports.ACTIVE_HABITAT_FLAG = exports.HABITAT_NAMESPACE = exports.HABITAT_HOST_KEY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HABITAT_HOST_KEY = exports.HABITAT_HOST_KEY = 'habitatHostElement';
var HABITAT_NAMESPACE = exports.HABITAT_NAMESPACE = 'data-habitat';
var ACTIVE_HABITAT_FLAG = exports.ACTIVE_HABITAT_FLAG = 'data-has-habitat';
var HABITAT_PROP = exports.HABITAT_PROP = 'data-prop-';
var HABITAT_PROP_JSON = exports.HABITAT_PROP_JSON = 'data-props';
var HABITAT_PROP_NUMBER = exports.HABITAT_PROP_NUMBER = 'data-n-prop-';
var HABITAT_PROP_REF = exports.HABITAT_PROP_REF = 'data-r-prop-';

var hasExpandoWarning = false;

/**
 * Determine an elements computed display style
 * @private
 * @param {HTMLElement}		ele		- The element to test
 * @returns {string}				- Returns 'block' or 'inline'
 */
function getDisplayType(ele) {
	var cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
	return cStyle.display;
}

/**
 * Converts the first letter of a string to uppercase
 * @private
 * @param {string}		input		- The string to parse
 * @returns {string}				- Returns the parsed string
 */
function firstLetterToUpper(input) {
	return input[1].toUpperCase();
}

/**
 * Converts a habitat hyphenated attribute name into camelCase
 * @param {string}		key			- The habitat pre attr
 * @param {string}		name		- The attribute name
 * @returns {string}				- The camel case value
 */
function getNameFor(key, name) {
	return name.replace(key, '').replace(/-([a-z])/g, firstLetterToUpper);
}

/**
 * The Habitat provider class
 */

var Habitat = function () {
	function Habitat() {
		_classCallCheck(this, Habitat);
	}

	_createClass(Habitat, null, [{
		key: 'parseProps',


		/**
   * Returns a dictionary of properties and values defined on an element
   */
		value: function parseProps(ele) {
			// Default props with reference to the initiating node
			var props = {
				proxy: ele // Pass in a reference to the original node
			};

			// Populate custom props from reading any ele attributes that start with 'data-prop-'
			for (var i = 0; i < ele.attributes.length; i++) {
				var a = ele.attributes[i];

				if (a.name.indexOf(HABITAT_PROP) === 0) {
					// Convert prop name from hyphens to camel case
					var name = getNameFor(HABITAT_PROP, a.name);

					var value = a.value || '';

					// Parse booleans
					if (typeof value === 'string' && value.toLowerCase() === 'false') {
						value = false;
					}
					if (typeof value === 'string' && value.toLowerCase() === 'true') {
						value = true;
					}

					// Parse json strings
					if (typeof value === 'string' && value.length >= 2 && (value[0] === '{' && value[value.length - 1] === '}' || value[0] === '[' && value[value.length - 1] === ']')) {
						value = JSON.parse(value);
					}

					// Parse nulls
					if (typeof value === 'string' && value.toLowerCase() === 'null') {
						value = null;
					}

					props[name] = value;
				} else

					// JSON type props
					if (a.name === HABITAT_PROP_JSON) {
						// Parse all of the props as json
						Object.assign(props, JSON.parse(a.value));
					} else

						// Number type props
						if (a.name.indexOf('data-n-prop-') === 0) {

							// Convert prop name from hyphens to camel case
							var _name = getNameFor(HABITAT_PROP_NUMBER, a.name);

							// Parse the value as a float as it handles both floats and whole int's
							// Might want to look at configuring the radix somehow in the future
							props[_name] = parseFloat(a.value);
						} else

							// Reference type props
							if (window && a.name.indexOf(HABITAT_PROP_REF) === 0) {

								// Convert prop name from hyphens to camel case
								var _name2 = getNameFor(HABITAT_PROP_REF, a.name);

								// Set the reference to the global object
								props[_name2] = window[a.value];
							}
			}

			return props;
		}

		/**
  * Creates a new habitat in the dom
  * @param {HTMLElement}  ele                         - The element
  * @param {string}       id                          - The container id
  * @param {object}       options                     - The habitat default options
  * @param {string}       [options.tag]               - The tag to use eg 'span'
  * @param {string}       [options.className]         - The habitats class name
  * @param {boolean}      [options.replaceDisabled]   - If true, the original node will be left in the dom
  * @returns {Element}
  */

	}, {
		key: 'create',
		value: function create(ele, id) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


			if (window.document.body === ele || ele === null || ele === undefined) {
				_Logger2.default.warn('RHW04', 'Cannot open a habitat for element.', ele);
				return null;
			}

			var tag = ele.getAttribute('data-habitat-tag') || options.tag || null;

			if (!tag) {
				tag = 'span';
				// If tag is a block level element, then replicate it with the portal
				if (getDisplayType(ele) === 'block') {
					tag = 'div';
				}
			}

			var habitat = window.document.createElement(tag);
			var className = ele.getAttribute('data-habitat-class') || options.className || null;

			var replaceDisabled = typeof options.replaceDisabled === 'boolean' ? options.replaceDisabled : false;
			if (ele.getAttribute('data-habitat-no-replace') !== null) {
				replaceDisabled = ele.getAttribute('data-habitat-no-replace').toLocaleLowerCase() === 'true';
			}

			// Keep references to habitats container id's
			habitat.setAttribute(HABITAT_NAMESPACE, id);

			// Set habitat class name if any
			if (className) {
				habitat.className = '' + className;
			}

			// inject habitat
			ele.parentNode.insertBefore(habitat, ele.nextSibling);

			// Determine if we should keep host element in the dom
			if (ele.tagName !== 'INPUT') {

				// Not an input so assumed we don't need to keep the target
				// element around

				if (!replaceDisabled) {
					// Detach it
					var host = ele.parentNode.removeChild(ele);

					// But try to keep a reference to the host in-case destroy is ever called
					// and we need to reinstate it back to how we found it

					try {
						// It might be better if we keep references in a weak map, need to look
						// at this in the future
						habitat[HABITAT_HOST_KEY] = host;
					} catch (e) {
						if (hasExpandoWarning) {
							// Expando is off
							_Logger2.default.warn('RHW06', 'Arbitrary properties are disabled.' + ' The container may not dispose correctly.', e);
							hasExpandoWarning = true;
						}
					}
				}
			} else {
				// The element is an input, leave it in the
				// dom to allow passing data back to the backend again
				// Set a flag so we know its been proccessed
				ele.setAttribute(ACTIVE_HABITAT_FLAG, 'true');

				// Set display none however if the input is not a hidden input
				// TODO: Investigate what this does to accessibility
				if (ele.getAttribute('type') !== 'hidden') {
					ele.setAttribute('style', 'display: none;');
				}
			}

			return habitat;
		}

		/**
   * Checks if an element has a habitat
   */

	}, {
		key: 'hasHabitat',
		value: function hasHabitat(ele) {
			return ele.getAttribute(ACTIVE_HABITAT_FLAG) !== null;
		}

		/**
  * Destroys a habitat
  * @param ele
  */

	}, {
		key: 'destroy',
		value: function destroy(ele) {

			// Attempt to reinstate any host objects
			try {
				if (typeof ele[HABITAT_HOST_KEY] !== 'undefined') {
					// Put back any hosts that where removed
					ele.parentNode.insertBefore(ele[HABITAT_HOST_KEY], ele);
				}
			} finally {
				// Remove the habitat element
				ele.parentNode.removeChild(ele);
			}
		}

		/**
   * Lists habitats for id
   * @param {string}      id      - The id
   * @returns {NodeList}
   */

	}, {
		key: 'listHabitats',
		value: function listHabitats(id) {
			return window.document.body.querySelectorAll('[' + HABITAT_NAMESPACE + '="' + id + '"]');
		}
	}]);

	return Habitat;
}();

exports.default = Habitat;