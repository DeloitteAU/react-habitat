"use strict";
var DOMUtils = (function () {
    function DOMUtils() {
    }
    DOMUtils.parseProps = function (ele) {
        // Default props with reference to the initiating node
        var _props = {};
        // Save a reference to the original node
        _props['fnNode'] = ele;
        // Populate custom props from reading any ele attributes that start with 'data-prop-'
        for (var i = 0; i < ele.attributes.length; i++) {
            var a = ele.attributes[i];
            if (a.name.indexOf('data-prop-') < 0) {
                continue;
            }
            // Convert prop name from hyphens to camel case
            var name_1 = a.name
                .replace('data-prop-', '')
                .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            var value = a.value || '';
            // Parse bool
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
                value = false;
            }
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
                value = true;
            }
            // Parse json
            if (typeof value === 'string' && value.length > 2 &&
                (value[0] === '{' && value[value.length - 1] === '}') ||
                (value[0] === '[' && value[value.length - 1] === ']')) {
                value = JSON.parse(value);
            }
            _props[name_1] = value;
        }
        return _props;
    };
    DOMUtils.openPortal = function (ele) {
        //TODO: Check if ele is inline or not and render portal accordingly
        var node = window.document.createElement('div');
        var className = ele.getAttribute('data-fn-class') || '';
        node.className = "fn-react-root " + className;
        // inject
        if (ele === window.document.body) {
            document.body.appendChild(node);
        }
        else {
            ele.parentNode.insertBefore(node, ele.nextSibling);
        }
        // Out with the old
        //TODO: We might want to leave this in actually, especially if its a <input /> as we might want to pass data back
        ele.parentNode.removeChild(ele);
        return node;
    };
    return DOMUtils;
}());
exports.DOMUtils = DOMUtils;
