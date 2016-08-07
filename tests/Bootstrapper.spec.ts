/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Container}        from '../src/Container';
import {Bootstrapper}     from '../src/Bootstrapper';
import {MochComponent}    from './mochs/MochComponent';
import {MochComponentTwo} from './mochs/MochComponentTwo';




describe("Bootstrapper", () => {

    class App extends Bootstrapper {
        constructor(container){
            super();
            this.setContainer(container);
        }
    }

    var node: HTMLElement;

    beforeEach(() => {
        node = document.createElement("div");
        window.document.body.appendChild(node);
    });

    afterEach(() => {
        window.document.body.removeChild(node);
    });

    it("should log unknown component warning", () => {

        spyOn(console, 'warn');

        node.innerHTML = '<div data-component="aUnknownComponent"></div>';
        var app = new App(new Container());

        expect(console.warn).toHaveBeenCalled();

    });

    it("should render a component", () => {

        node.innerHTML = '<div data-component="IMochComponent"></div>';

        // -- MOCH CONTAINER SET UP -- //
        var container = new Container();
        container.registerComponent('IMochComponent', MochComponent);
        // --------------------------- //

        var _ = new App(container),
            componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

        expect(componentLookup).not.toEqual(null);
        expect(componentLookup.length).toEqual(1);
    });


    it("should render multiple components", () => {

        node.innerHTML = '<div data-component="IMochComponent"></div><div data-component="IMochComponent"></div>';

        // -- MOCH CONTAINER SET UP -- //
        var container = new Container();
        container.registerComponent('IMochComponent', MochComponent);
        // --------------------------- //

        var _ = new App(container),
            componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

        expect(componentLookup).not.toEqual(null);
        expect(componentLookup.length).toEqual(2);
    });


    it("should render two different components", () => {

        node.innerHTML = '<div data-component="IMochComponent"></div><div data-component="IMochComponentTwo"></div>';

        // -- MOCH CONTAINER SET UP -- //
        var container = new Container();
        container.registerComponent('IMochComponent', MochComponent);
        container.registerComponent('IMochComponentTwo', MochComponentTwo);
        // --------------------------- //

        var _ = new App(container),
            componentLookup = node.innerHTML.match(/\[component MochComponent\]/g),
            component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);

        expect(componentLookup).not.toEqual(null);
        expect(componentLookup.length).toEqual(1);

        expect(component2Lookup).not.toEqual(null);
        expect(component2Lookup.length).toEqual(1);
    });




    it("should pass props", () => {

        node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

        // -- MOCH CONTAINER SET UP -- //
        var container = new Container();
        container.registerComponent('IMochComponent', MochComponent);
        // --------------------------- //

        var _ = new App(container),
            componentLookup = node.innerHTML.match(/\[component MochComponent\]/g),
            propLookup = node.innerHTML.match(/title='test'/g);

        expect(componentLookup).not.toEqual(null);
        expect(propLookup).not.toEqual(null);
        expect(componentLookup.length).toEqual(1);
        expect(propLookup.length).toEqual(1);

    });

});
