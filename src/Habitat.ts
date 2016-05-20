
export class Habitat {

    /**
     *
     */
    static parseProps(ele: Element): {} {

        // Default props with reference to the initiating node
        var _props: {[id: string]: any} = {};

        // Save a reference to the original node
        _props['fnNode'] = ele;

        // Populate custom props from reading any ele attributes that start with 'data-prop-'
        for(var i=0;i<ele.attributes.length;i++) {

            var a = ele.attributes[i];

            if(/*!a.specified || */ a.name.indexOf('data-prop-') < 0){ continue; }

            // Convert prop name from hyphens to camel case
            let name = a.name
                .replace('data-prop-', '')
                .replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });

            let value: any = a.value || '';

            // Parse bool
            if(typeof value === 'string' && value.toLocaleLowerCase() === 'false'){ value = false; }
            if(typeof value === 'string' && value.toLocaleLowerCase() === 'true') { value = true;  }

            // Parse json
            if(typeof value === 'string' && value.length > 2 &&
                (value[0] === '{' && value[value.length-1] === '}') ||
                (value[0] === '[' && value[value.length-1] === ']')
            ){
                value = JSON.parse(value);
            }

            _props[name] = value;
        }

        return _props;
    }


    /**
     *
     */
    static createHabitat(ele: Element, type: string): Element {

        var tag: string;

        // If tag is a block level element, then replicate it with the portal
        switch(ele.tagName) {
          case 'span':
            tag = 'span';
            break;
          default:
            tag = 'div';
        }

        let habitat: Element = window.document.createElement(tag);
        let className = ele.getAttribute('data-habitat-class') || null;

        // Keep references to habitats
        habitat.setAttribute('data-habitat', type);

        // Set habitat class name if any
        if(className) {
            habitat.className = `${className}`;
        }

        // inject habitat
        if(ele === window.document.body) {
            document.body.appendChild(habitat);
        } else {
            ele.parentNode.insertBefore(habitat, ele.nextSibling);
        }

        // Determine if we should keep target element in the dom
        if(ele.tagName !== 'input' || ele.tagName !== 'textarea') {

            // Not an input so assumed we dont need to keep the targe
            // element around
            ele.parentNode.removeChild(ele);

        } else {

          // The element is an input, leave it in the
          // dom to allow passing data back to the backend again but we can
          // hide it

          ele.setAttribute('style', 'display:none;');
        }

        return habitat;

    }




}
