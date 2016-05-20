"use strict";
var Habitat = (function () {
    function Habitat() {
    }
    /**
     *
     */
    Habitat.parseProps = function (ele) {
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
    /**
     *
     */
    Habitat.createHabitat = function (ele, type) {
        var tag;
        // If tag is a block level element, then replicate it with the portal
        switch (ele.tagName) {
            case 'span':
                tag = 'span';
                break;
            default:
                tag = 'div';
        }
        var habitat = window.document.createElement(tag);
        var className = ele.getAttribute('data-habitat-class') || null;
        // Keep references to habitats
        habitat.setAttribute('data-habitat', type);
        // Set habitat class name if any
        if (className) {
            habitat.className = "" + className;
        }
        // inject habitat
        if (ele === window.document.body) {
            document.body.appendChild(habitat);
        }
        else {
            ele.parentNode.insertBefore(habitat, ele.nextSibling);
        }
        // Determine if we should keep target element in the dom
        if (ele.tagName !== 'input' || ele.tagName !== 'textarea') {
            // Not an input so assumed we dont need to keep the targe
            // element around
            ele.parentNode.removeChild(ele);
        }
        else {
            // The element is an input, leave it in the
            // dom to allow passing data back to the backend again but we can
            // hide it
            ele.setAttribute('style', 'display:none;');
        }
        return habitat;
    };
    return Habitat;
}());
exports.Habitat = Habitat;
