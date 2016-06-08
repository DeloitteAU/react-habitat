"use strict";
var Habitat = (function () {
    function Habitat() {
    }
    Habitat.parseProps = function (ele) {
        var _props = {};
        _props['fnNode'] = ele;
        for (var i = 0; i < ele.attributes.length; i++) {
            var a = ele.attributes[i];
            if (a.name.indexOf('data-prop-') < 0) {
                continue;
            }
            var name_1 = a.name
                .replace('data-prop-', '')
                .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            var value = a.value || '';
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'false') {
                value = false;
            }
            if (typeof value === 'string' && value.toLocaleLowerCase() === 'true') {
                value = true;
            }
            if (typeof value === 'string' && value.length > 2 &&
                (value[0] === '{' && value[value.length - 1] === '}') ||
                (value[0] === '[' && value[value.length - 1] === ']')) {
                value = JSON.parse(value);
            }
            _props[name_1] = value;
        }
        return _props;
    };
    Habitat.createHabitat = function (ele, type) {
        var tag;
        switch (ele.tagName) {
            case 'span':
                tag = 'span';
                break;
            default:
                tag = 'div';
        }
        var habitat = window.document.createElement(tag);
        var className = ele.getAttribute('data-habitat-class') || null;
        habitat.setAttribute('data-habitat', type);
        if (className) {
            habitat.className = "" + className;
        }
        if (ele === window.document.body) {
            document.body.appendChild(habitat);
        }
        else {
            ele.parentNode.insertBefore(habitat, ele.nextSibling);
        }
        if (ele.tagName !== 'input' || ele.tagName !== 'textarea') {
            ele.parentNode.removeChild(ele);
        }
        else {
            ele.setAttribute('style', 'display:none;');
        }
        return habitat;
    };
    return Habitat;
}());
exports.Habitat = Habitat;
