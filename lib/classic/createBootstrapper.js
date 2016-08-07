/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bootstrapper_1 = require('../Bootstrapper');
var Container_1 = require('../Container');
/*
* Mixin class used for extending the classic spec
* @private
*/
var _Mixin = (function (_super) {
    __extends(_Mixin, _super);
    /*
    * A Constructor that takes a spec
    */
    function _Mixin(spec) {
        _super.call(this);
        // Check if a container spec was supplied
        if (!spec['container']) {
            console.warn('"Container" property was not supplied');
            return;
        }
        // Create a new container
        var container = new Container_1.Container();
        // Iterate the spec and register its components
        for (var _i = 0, _a = spec['container']; _i < _a.length; _i++) {
            var definition = _a[_i];
            container.registerComponent(definition['register'], definition['for']);
        }
        // Finally, set the container
        this.setContainer(container);
    }
    return _Mixin;
}(Bootstrapper_1.Bootstrapper));
exports._Mixin = _Mixin;
/*
*
*/
exports.createBootstrapper = function (spec) {
    return new _Mixin(spec);
};
