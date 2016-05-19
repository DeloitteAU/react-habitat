/**
 * Created by jsalau on 1/05/2016.
 */
export interface IContainer {

    registerComponent:(name:string, comp:any) =>  void;

    getComponent:(name:string) => any;

}



