"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMFactory = (function () {
    function ReactDOMFactory() {
    }
    ReactDOMFactory.prototype.identifier = function () {
        return 'React';
    };
    ReactDOMFactory.prototype.inject = function (module, props, target) {
        if (target) {
            ReactDOM.render(React.createElement(module, props || {}), target);
        }
        else {
            console.warn('Target element is null or undefined. Cannot inject component');
        }
    };
    return ReactDOMFactory;
}());
exports.ReactDOMFactory = ReactDOMFactory;
