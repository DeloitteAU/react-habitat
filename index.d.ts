/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

 export interface IDomFactory {

	/**
	 * An identifier string for the type of components this injects
	 */
	identifier: () => string;
	/**
	 * The inject method after a wire-up has been requested
	 * @param {*}           module      - The component
	 * @param {object}      props       - The components properties
	 * @param {Element}     target      - The element to inject the component into
	 */
	inject?: (module: any, props: {}, target: Element) => void;
 }

 export interface IContainer {
	/**
	 * Register a new component in the container
	 * @param {string}      name        - The key that identifies this component
	 * @param {*}           comp        - The component class
	 */
	registerComponent: (name: string, comp: any) => void;
	/**
	 * Get a registered component for a key
	 * @param {string}      name        - The key name of the component that has been registered
	 */
	resolve: (name: string) => any;
 }

 export interface IBootstrapper {

	 /**
	  * The dom factory
	  */
	factory: IDomFactory;

	 /**
	  * Set the container
	  * @param {IContainer}		container	- The container
      */
	setContainer: (container: IContainer) => void;

 }


declare module ReactHabitat {

	export class Bootstrapper implements IBootstrapper {

		/**
		 * The bootstrapping factory
		 */
		factory: IDomFactory;

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
		 * The container
		 * @private
		 */
		_container: IContainer;
	}

	export class Container implements IContainer {

		/**
		 * Register a component
		 */
		registerComponent: (name: string, comp: any) => void;

		/**
		 * Resolve a component
		 */
		resolve: (name: string) => any;
	}

}

export default ReactHabitat;
