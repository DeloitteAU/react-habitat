"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
class ReactFactory {
    static inject(module, props, target) {
        //let target = (typeof ele === 'string') ? window.document.getElementById(ele) : ele;
        if (target) {
            ReactDOM.render(React.createElement(module, props || {}), target);
        }
    }
}
exports.ReactFactory = ReactFactory;
