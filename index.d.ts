/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface IDomFactory {

	/**
	 * The inject method after a wire-up has been requested
	 * @param {*}           module      - The component
	 * @param {object}      props       - The components properties
	 * @param {Element}     target      - The element to inject the component into
	 */
	inject: (module: any, props: {}, target: Element) => void;

	/**
	 * The dispose method
	 * @param {Element}		target		- The element to dispose
     */
	dispose: (target: Element) => void;
 }

export interface IContainer {

	/**
	 * Register a new component in the container
	 * @param {string}      name        - The key that identifies this component
	 * @param {*}           comp        - The component class
	 */
	register: (name: string, comp: any) => void;

	/**
	 * Register multiple components in the container
	 * @param {object}      comps        - The components
	 */
	registerAll: (comps: {}) => void;

	/**
	 * Get a registered component for a key
	 * @param {string}      name        - The key name of the component that has been registered
	 */
	resolve: (name: string) => any;

	/**
	* The container's unique id
	*/
	id: () => string;

	/**
	 * The containers dom factory
	 */
	domFactory: () => IDomFactory;
}

 export interface IBootstrapper {

	 /**
	  * Set the container
	  * @param {IContainer}		container	- The container
      */
	setContainer: (container: IContainer) => void;

	 /**
	  * Dispose of the container
	  */
	 dispose: () => void;
 }


declare module ReactHabitat {

	export class Bootstrapper implements IBootstrapper {

		/**
		 * Sets the container
		 */
		setContainer: (container: IContainer) => void;

		/**
		 * The component selector
		 */
		componentSelector: string;

		/**
		 * Collection of elements matching the component selector
		 */
		elements: NodeListOf<Element>;

		/**
		 * Disposes the container
		 */
		dispose: () => void;
	}

	export class Container implements IContainer {

		/**
		 * The containers unique id
		 */
		id: () => string;

		/**
		 * Register a component
		 */
		register: (name: string, comp: any) => void;

		/**
		 * Register a component
		 */
		registerAll: (comps: {}) => void;

		/**
		 * Resolve a component
		 */
		resolve: (name: string) => any;

		/**
		 * The containers dom factory
		 */
		domFactory: () => IDomFactory;
	}

}

export default ReactHabitat;
