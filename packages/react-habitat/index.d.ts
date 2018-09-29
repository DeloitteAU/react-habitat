/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module "react-habitat" {

	interface IDomFactory {

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

	interface IContainer {
		/**
		 * Get a registered component for a key
		 * @param {string}      name        - The key name of the component that has been registered
		 */
		resolve: (name: string) => any;

		/**
		 * Resolve a component with its meta data
		 */
		resolveWithMeta: (name: string) => any;

		/**
		* The container's unique id
		*/
		id: string;

		/**
		 * The containers dom factory
		 */
		factory: IDomFactory;
	}

	interface IBootstrapper {

		/**
		  * Set the container
		  * @param {IContainer}		container	- The container
	      */
		setContainer: (container: IContainer) => void;

		/**
		 * Apply the container to an updated dom structure
		 */
		update: (node?: Element) => void;

		/**
		 * Start DOM watcher for auto wire ups
		 */
		startWatcher: () => void;

		/**
		 * Stop the DOM watcher if running
		 */
		stopWatcher: () => void;

		/**
		 * Dispose of the container
		*/
		dispose: () => void;
	}

	interface IRegistrationOptions {

		/**
		 * The tag to render with eg 'span'
		 */
		tag?: string;

		/**
		 * The habitats class name
		 */
		className?: string;

		/**
		 * If true, the original node will remain in the dom
		 */
		replaceDisabled?: boolean;

	}

	interface IRegistration {

		/**
		 * Set the registration key, must be unique
		 * @param {string}  key     - The key
		 */
		as: (key: string) => IRegistration;

		/**
		 * Set the registration default props
		 */
		withDefaultProps: (defaultProps: any) => IRegistration;

		/**
		 * Set the habitat options
		 */
		withOptions: (options: Partial<IRegistrationOptions>) => IRegistration;

	}

	interface IContainerBuilder {

		/**
		 * Register new component
		 */
		register: (component: any) => IRegistration;

		/**
		 * Register new component asycnrosly
		 */
		registerAsync: (operator: () => Promise<any>) => IRegistration;

		/**
		 * The container factory
		 */
		factory: IDomFactory;

		/**
		 * Build the container
		 */
		build: () => IContainer;

	}

	class Bootstrapper implements IBootstrapper {

		/**
		 * Sets the container
		 */
		setContainer: (container: IContainer, callback?: Function) => void;

		/**
		 * The component selector
		 */
		componentSelector: string;

		/**
		 * Apply the container to an updated dom structure
		 */
		update: (node?: Element) => void;

		/**
		 * Start DOM watcher for auto wire ups
		 */
		startWatcher: () => void;

		/**
		 * Stop the DOM watcher if running
		 */
		stopWatcher: () => void;

		/**
		 * Disposes the container
		 */
		dispose: () => void;
	}

	class Container implements IContainer {

		constructor(factory: IDomFactory, registrations?: any);

		/**
		 * The containers unique id
		 */
		id: string;

		/**
		 * Resolve a component
		 */
		resolve: (name: string) => any;

		/**
		 * Resolve a component with its meta data
		 */
		resolveWithMeta: (name: string) => any;

		/**
		 * The containers dom factory
		 */
		factory: IDomFactory;

		/**
		 * Returns the number of registrations in the container
		 */
		length: Number;
	}

	class ContainerBuilder implements IContainerBuilder {

		constructor(defaultOptions?: Partial<IRegistrationOptions>);

		/**
		 * Register new component
		 */
		register: (component: any) => IRegistration;

		/**
		 * Register new component asycnrosly
		 * @param operator
		 */
		registerAsync: (operator: () => Promise<any>) => IRegistration;

		/**
		 * The container factory
		 */
		factory: IDomFactory;

		/**
		 * Build the container
		 */
		build: () => IContainer;

	}
}
