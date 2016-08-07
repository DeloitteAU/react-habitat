import { IDomFactory } from '../interfaces/IDomFactory';
export declare class ReactDomFactory implements IDomFactory {
    identifier(): string;
    inject(module: any, props: {}, target: Element): void;
}
