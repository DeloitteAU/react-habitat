import {createBootstrapper} from '../../src/classic/createBootstrapper';
import {MochComponent}  from '../mochs/MochComponent';
import {MochComponentTwo}  from '../mochs/MochComponentTwo';

  describe("Bootstrapper", () => {

      var node: HTMLElement;

      beforeEach(() => {
          node = document.createElement("div");
          window.document.body.appendChild(node);
      });

      afterEach(() => {
          window.document.body.removeChild(node);
      });

      it("should log missing container warning", () => {
          spyOn(console, 'warn');

          createBootstrapper({});

          expect(console.warn).toHaveBeenCalled();
      });

      it("should log unknown component warning", () => {

          spyOn(console, 'warn');

          node.innerHTML = '<div data-component="aUnknownComponent"></div>';

          createBootstrapper({
            container: []
          });

          expect(console.warn).toHaveBeenCalled();
      });

      it("should render a component", () => {

          node.innerHTML = '<div data-component="IMochComponent"></div>';

          createBootstrapper({
            container: [
              {register: 'IMochComponent', for: MochComponent}
            ]
          });

          var componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

          expect(componentLookup).not.toEqual(null);
          expect(componentLookup.length).toEqual(1);
      });


      it("should render multiple components", () => {

          node.innerHTML = '<div data-component="IMochComponent"></div><div data-component="IMochComponent"></div>';

          createBootstrapper({
            container: [
              {register: 'IMochComponent', for: MochComponent}
            ]
          });

          var componentLookup = node.innerHTML.match(/\[component MochComponent\]/g);

          expect(componentLookup).not.toEqual(null);
          expect(componentLookup.length).toEqual(2);
      });


      it("should render two different components", () => {

          node.innerHTML = '<div data-component="IMochComponent"></div><div data-component="IMochComponentTwo"></div>';

          createBootstrapper({
            container: [
              {register: 'IMochComponent', for: MochComponent},
              {register: 'IMochComponentTwo', for: MochComponentTwo}
            ]
          });

          var componentLookup = node.innerHTML.match(/\[component MochComponent\]/g),
              component2Lookup = node.innerHTML.match(/\[component MochComponentTwo\]/g);

          expect(componentLookup).not.toEqual(null);
          expect(componentLookup.length).toEqual(1);

          expect(component2Lookup).not.toEqual(null);
          expect(component2Lookup.length).toEqual(1);
      });

      it("should pass props", () => {

          node.innerHTML = '<div data-component="IMochComponent" data-prop-title="test"></div>';

          createBootstrapper({
            container: [
              {register: 'IMochComponent', for: MochComponent}
            ]
          });

          var componentLookup = node.innerHTML.match(/\[component MochComponent\]/g),
              propLookup = node.innerHTML.match(/title='test'/g);

          expect(componentLookup).not.toEqual(null);
          expect(propLookup).not.toEqual(null);
          expect(componentLookup.length).toEqual(1);
          expect(propLookup.length).toEqual(1);

      });

  });
