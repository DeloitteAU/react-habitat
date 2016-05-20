/**
 * The DOM Factory
 */
export interface IDOMFactory {
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
