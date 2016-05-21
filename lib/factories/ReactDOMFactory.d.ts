import { IDOMFactory } from '../interfaces/IDOMFactory';
export declare class ReactDOMFactory implements IDOMFactory {
    identifier(): string;
    inject(module: any, props: {}, target: Element): void;
}
