import {IContainer} from '../src/interfaces/IContainer';
import {Container} from '../src/Container';

describe("Container", () => {

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

      var mockComponent = 'abc';
      var mockComponent2 = 'cba';

        container.registerComponent('aComponent', mockComponent);
        container.registerComponent('aComponent', mockComponent2);

        expect(container).toBeDefined();
        expect(container.getComponent('aComponent')).toBe(mockComponent2);
    });


    it("does resolve distinct components", () => {

      var mockComponent = 'abc';
      var mockComponent2 = 'cba';

      container.registerComponent('aComponent', mockComponent);
      container.registerComponent('aComponent2', mockComponent2);

      expect(container.getComponent('aComponent')).toBe(mockComponent);
      expect(container.getComponent('aComponent2')).toBe(mockComponent2);
    });


});
