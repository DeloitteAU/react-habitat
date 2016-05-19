import {IContainer} from '../src/interfaces/IContainer';
import {Container} from '../src/Container';

describe("Container suite", () => {

    var container: IContainer;

    beforeEach(function() {
        container = new Container();
    });

    it("does construct", () => {
        expect(container).toBeDefined();
    });


    it("does register components", () => {

        var mockComponent = (() => {return this;})();

        container.registerComponent('aComponent', mockComponent);

        expect(container).toBeDefined();
        expect(container.getComponent('aComponent')).toBe(mockComponent);
    });


    it("does override registered components", () => {

        var mockComponent = (() => {return this;})();
        var mockComponent2 = (() => {return this;})();

        container.registerComponent('aComponent', mockComponent);
        container.registerComponent('aComponent', mockComponent2);

        expect(container).toBeDefined();
        expect(container.getComponent('aComponent')).toBe(mockComponent2);
    });


});