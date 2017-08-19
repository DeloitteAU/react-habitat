/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Logger from './Logger';

export const HABITAT_HOST_KEY = 	'habitatHostElement';
export const HABITAT_NAMESPACE = 	'data-habitat';
export const ACTIVE_HABITAT_FLAG =  'data-has-habitat';
export const HABITAT_PROP = 		'data-prop-';
export const HABITAT_PROP_JSON = 	'data-props';
export const HABITAT_PROP_NUMBER =  'data-n-prop-';
export const HABITAT_PROP_REF = 	'data-r-prop-';

let hasExpandoWarning = false;

/**
 * Determine an elements computed display style
 * @private
 * @param {HTMLElement}		ele		- The element to test
 * @returns {string}				- Returns 'block' or 'inline'
 */
function getDisplayType(ele) {
	const cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
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
	return name
		.replace(key, '')
		.replace(/-([a-z])/g, firstLetterToUpper);
}

/**
 * The Habitat provider class
 */
export default class Habitat {

	/**
	 * Returns a dictionary of properties and values defined on an element
	 */
	static parseProps(ele) {
		// Default props with reference to the initiating node
		const props = {
			proxy: ele,  // Pass in a reference to the original node
		};

		// Populate custom props from reading any ele attributes that start with 'data-prop-'
		for (let i = 0; i < ele.attributes.length; i++) {
			const a = ele.attributes[i];

			if (a.name.indexOf(HABITAT_PROP) === 0) {
				// Convert prop name from hyphens to camel case
				const name = getNameFor(HABITAT_PROP, a.name);

				let value = a.value || '';

				// Parse booleans
				if (typeof value === 'string' && value.toLowerCase() === 'false') { value = false; }
				if (typeof value === 'string' && value.toLowerCase() === 'true') { value = true; }

				// Parse json strings
				if (typeof value === 'string' && value.length >= 2 &&
					((value[0] === '{' && value[value.length - 1] === '}') ||
					(value[0] === '[' && value[value.length - 1] === ']'))) {
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
				const name = getNameFor(HABITAT_PROP_NUMBER, a.name);

				// Parse the value as a float as it handles both floats and whole int's
				// Might want to look at configuring the radix somehow in the future
				props[name] = parseFloat(a.value);
			} else

			// Reference type props
			if (window && a.name.indexOf(HABITAT_PROP_REF) === 0) {

				// Convert prop name from hyphens to camel case
				const name = getNameFor(HABITAT_PROP_REF, a.name);

				// Set the reference to the global object
				props[name] = window[a.value];

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
	static create(ele, id, options = {}) {

		if (window.document.body === ele || ele === null || ele === undefined) {
			Logger.warn('RHW04', 'Cannot open a habitat for element.', ele);
			return null;
		}

		let tag = ele.getAttribute('data-habitat-tag') || options.tag || null;

		if (!tag) {
			tag = 'span';
			// If tag is a block level element, then replicate it with the portal
			if (getDisplayType(ele) === 'block') {
				tag = 'div';
			}
		}

		const habitat = window.document.createElement(tag);
		const className = ele.getAttribute('data-habitat-class') || options.className || null;

		let replaceDisabled = typeof options.replaceDisabled === 'boolean' ? options.replaceDisabled : false;
		if (ele.getAttribute('data-habitat-no-replace') !== null) {
			replaceDisabled = ele
					.getAttribute('data-habitat-no-replace')
					.toLocaleLowerCase() === 'true';
		}

		// Keep references to habitats container id's
		habitat.setAttribute(HABITAT_NAMESPACE, id);

		// Set habitat class name if any
		if (className) {
			habitat.className = `${className}`;
		}

		// inject habitat
		ele.parentNode.insertBefore(habitat, ele.nextSibling);

		// Determine if we should keep host element in the dom
		if (ele.tagName !== 'INPUT') {

			// Not an input so assumed we don't need to keep the target
			// element around

			if (!replaceDisabled) {
				// Detach it
				const host = ele.parentNode.removeChild(ele);

				// But try to keep a reference to the host in-case destroy is ever called
				// and we need to reinstate it back to how we found it

				try {
					// It might be better if we keep references in a weak map, need to look
					// at this in the future
					habitat[HABITAT_HOST_KEY] = host;
				} catch (e) {
					if (hasExpandoWarning) {
						// Expando is off
						Logger.warn('RHW06', 'Arbitrary properties are disabled.' +
							' The container may not dispose correctly.', e);
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
	static hasHabitat(ele) {
		return ele.getAttribute(ACTIVE_HABITAT_FLAG) !== null;
	}

	/**
	* Destroys a habitat
	* @param ele
	*/
	static destroy(ele) {

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
	static listHabitats(id) {
		return window.document.body.querySelectorAll(`[${HABITAT_NAMESPACE}="${id}"]`);
	}

}
