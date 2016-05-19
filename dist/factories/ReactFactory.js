"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var ReactFactory = (function () {
    function ReactFactory() {
    }
    ReactFactory.inject = function (module, props, target) {
        //let target = (typeof ele === 'string') ? window.document.getElementById(ele) : ele;
        if (target) {
            ReactDOM.render(React.createElement(module, props || {}), target);
        }
    };
    return ReactFactory;
}());
exports.ReactFactory = ReactFactory;
