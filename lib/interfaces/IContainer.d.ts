/**
 * The container interface
 */
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
    getComponent: (name: string) => any;
}
