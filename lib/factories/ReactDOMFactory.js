/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDomFactory = (function () {
    function ReactDomFactory() {
    }
    ReactDomFactory.prototype.identifier = function () {
        return 'react';
    };
    ReactDomFactory.prototype.inject = function (module, props, target) {
        if (target) {
            ReactDOM.render(React.createElement(module, props || {}), target);
        }
        else {
            console.warn('Target element is null or undefined. Cannot inject component');
        }
    };
    return ReactDomFactory;
}());
exports.ReactDomFactory = ReactDomFactory;
