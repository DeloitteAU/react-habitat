'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

function firstLetterToUpper(input) {
	return input[1].toUpperCase();
}

/**
 * The host id
 * @type {string}
 */
var HABITAT_HOST_ID = 'data-habitat-host';

/**
 * Determine an elements computed display style
 * @param {HTMLElement}		ele		- The element to test
 * @returns {string}				- Returns 'block' or 'inline'
 */
function getDisplayType(ele) {
	var cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
	return cStyle.display;
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
				proxy: ele };

			// Populate custom props from reading any ele attributes that start with 'data-prop-'
			for (var i = 0; i < ele.attributes.length; i++) {
				var a = ele.attributes[i];

				if (a.name.indexOf('data-prop-') >= 0) {
					// Convert prop name from hyphens to camel case
					var name = a.name.replace('data-prop-', '').replace(/-([a-z])/g, firstLetterToUpper);

					var value = a.value || '';

					// Parse booleans
					if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
						value = false;
					}
					if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
						value = true;
					}

					// Parse json strings
					if (typeof value === 'string' && value.length > 2 && (value[0] === '{' && value[value.length - 1] === '}' || value[0] === '[' && value[value.length - 1] === ']')) {
						value = JSON.parse(value);
					}

					props[name] = value;
				} else if (a.name === 'data-props') {
					Object.assign(props, JSON.parse(a.value));
				}
			}

			return props;
		}

		/**
  * Creates a new habitat in the dom
  * @param {HTMLElement}     ele   - The element
  * @param {string}          id    - The container id
  * @returns {Element}
  */

	}, {
		key: 'create',
		value: function create(ele, id) {
			var tag = 'span';

			// If tag is a block level element, then replicate it with the portal
			if (getDisplayType(ele) === 'block') {
				tag = 'div';
			}

			var habitat = window.document.createElement(tag);
			var className = ele.getAttribute('data-habitat-class') || null;

			var replaceDisabled = false;
			if (ele.getAttribute('data-habitat-no-replace') !== null) {
				replaceDisabled = ele.getAttribute('data-habitat-no-replace').toLocaleLowerCase() === 'true';
			}

			// Keep references to habitats container id's
			habitat.setAttribute('data-habitat', id);

			// Set habitat class name if any
			if (className) {
				habitat.className = '' + className;
			}

			// inject habitat
			if (ele === window.document.body) {
				document.body.appendChild(habitat);
			} else {
				ele.parentNode.insertBefore(habitat, ele.nextSibling);
			}

			// Determine if we should keep host element in the dom
			if (ele.tagName !== 'INPUT') {

				// Not an input so assumed we don't need to keep the target
				// element around

				// Check it is empty first
				if (ele.innerHTML !== '') {
					throw new Error('React Habitat elements must be empty. ' + 'Any child components should be added inside React.');
				}

				if (!replaceDisabled) {
					// Detach it
					var host = ele.parentNode.removeChild(ele);

					// But try to keep a reference to the host in-case destroy is ever called
					// and we need to reinstate it back to how we found it
					try {
						habitat[HABITAT_HOST_ID] = host;
					} catch (e) {
						console.log(e);
					}
				}
			} else if (ele.getAttribute('type') !== 'hidden') {
				// The element is an input, leave it in the
				// dom to allow passing data back to the backend again

				// Set display none however if the input is not a hidden input
				// TODO: Investigate what this does to accessibility

				ele.setAttribute('style', 'display: none;');
			}

			return habitat;
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
				if (typeof ele[HABITAT_HOST_ID] !== 'undefined') {
					// Put back any hosts that where removed
					ele.parentNode.insertBefore(ele[HABITAT_HOST_ID], ele);
				}
			} catch (e) {
				console.log(e);
			}

			// Remove the habitat element
			ele.parentNode.removeChild(ele);
		}
	}]);

	return Habitat;
}();

exports.default = Habitat;