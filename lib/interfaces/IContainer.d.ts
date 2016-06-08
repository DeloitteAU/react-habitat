export interface IContainer {
    registerComponent: (name: string, comp: any) => void;
    getComponent: (name: string) => any;
}
