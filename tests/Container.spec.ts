/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IContainer}         from '../src/interfaces/IContainer';
import {Container}          from '../src/Container';
import {MochComponent}      from './mochs/MochComponent';
import {MochComponentTwo}   from './mochs/MochComponentTwo';

describe("Container", () => {

    var container: IContainer;

    beforeEach(function() {
        container = new Container();
    });

    it("does construct", () => {
        expect(container).toBeDefined();
    });


    it("does register components", () => {

        container.registerComponent('aComponent', MochComponent);

        expect(container).toBeDefined();
        expect(container.getComponent('aComponent')).toBe(MochComponent);
    });


    it("does override registered components", () => {

        container.registerComponent('aComponent', MochComponent);
        container.registerComponent('aComponent', MochComponentTwo);

        expect(container).toBeDefined();
        expect(container.getComponent('aComponent')).toBe(MochComponentTwo);
    });


    it("does resolve distinct components", () => {

      container.registerComponent('aComponent', MochComponent);
      container.registerComponent('aComponent2', MochComponentTwo);

      expect(container.getComponent('aComponent')).toBe(MochComponent);
      expect(container.getComponent('aComponent2')).toBe(MochComponentTwo);
    });


});
