import {Container}  from '../src/Container';
import {Bootstrapper} from '../src/Bootstrapper';
import {MochComponent} from './mochs/MochComponent';

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