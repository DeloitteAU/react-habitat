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
const HABITAT_HOST_KEY = 'habitatHostElement';
const HABITAT_NAMESPACE = 'data-habitat';
const ACTIVE_HABITAT_FLAG = 'data-has-habitat';

/**
 * Determine an elements computed display style
 * @param {HTMLElement}		ele		- The element to test
 * @returns {string}				- Returns 'block' or 'inline'
 */
function getDisplayType(ele) {
	const cStyle = ele.currentStyle || window.getComputedStyle(ele, '');
	return cStyle.display;
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

			if (a.name.indexOf('data-prop-') >= 0) {
				// Convert prop name from hyphens to camel case
				const name = a.name
					.replace('data-prop-', '')
					.replace(/-([a-z])/g, firstLetterToUpper);

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
	static create(ele, id) {

		if (window.document.body === ele || ele === null || ele === undefined) {
			console.warn('Cannot open a habitat for ', ele);
			return null;
		}

		let tag = 'span';

		// If tag is a block level element, then replicate it with the portal
		if (getDisplayType(ele) === 'block') {
			tag = 'div';
		}

		const habitat = window.document.createElement(tag);
		const className = ele.getAttribute('data-habitat-class') || null;

		let replaceDisabled = false;
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

			// Check it is empty first (ignoring white space and line breaks)
			if (ele.innerHTML.replace(/( |\r\n|\n|\r)/g,'') !== '') {
				throw new Error(
					'React Habitat elements must be empty. ' +
					'Any child components should be added inside the React component.'
				);
			}

			if (!replaceDisabled) {
				// Detach it
				const host = ele.parentNode.removeChild(ele);

				// But try to keep a reference to the host in-case destroy is ever called
				// and we need to reinstate it back to how we found it
				try {
					habitat[HABITAT_HOST_KEY] = host;
				} catch (e) {
					// Expando is off
					console.warn(
						'Arbitrary properties are disabled ' +
						'and Habitat may not dispose correctly.', e);
				}
			}

		} else {
			// The element is an input, leave it in the
			// dom to allow passing data back to the backend again
			// // Set a flag so we know its been proccessed
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

}
