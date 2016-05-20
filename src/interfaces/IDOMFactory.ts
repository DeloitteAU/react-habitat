
export interface IDOMFactory {

    identifier: () => string;

    inject?:(module: any, props: {}, target: Element) => void;

}
