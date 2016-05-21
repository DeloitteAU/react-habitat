/**
 * The Habitat class
 */
export declare class Habitat {
    /**
     * Returns a dictionary of properties and values defined on an element
     */
    static parseProps(ele: Element): {
        [id: string]: any;
    };
    /**
     * Creates a new habitat in the dom
     */
    static createHabitat(ele: Element, type: string): Element;
}
