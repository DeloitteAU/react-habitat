import * as React           from 'react';
import * as ReactDOM        from 'react-dom';

import {IFactory}           from '../interfaces/IFactory';

export class ReactFactory implements IFactory {

    static inject(module: any, props: {}, target: Element) {

        //let target = (typeof ele === 'string') ? window.document.getElementById(ele) : ele;

        if(target){
            ReactDOM.render(
                React.createElement(module, props || {}),
                target
            );
        }
    }

}