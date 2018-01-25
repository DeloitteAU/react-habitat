ReactHabitat comes with a `createBootstrapper` method for our es5 users.

```javascript
var ReactHabitat = require('react-habitat');
var SomeReactComponent = require('./SomeReactComponent');
var AnotherReactComponent = require('./AnotherReactComponent');

function MyApp() {

  // Create a new react habitat bootstrapper
  this.domContainer = ReactHabitat.createBootstrapper({

    // default options (optional)
    defaultOptions: {
        tag: 'div',                 // (Optional)
        className: 'myHabitat',     // (Optional)
        replaceDisabled: false      // (Optional)
    },

    // Create a new container (Required)
    container: [

      // Register your top level component(s)
      {register: 'SomeReactComponent', for: SomeReactComponent},
      {register: 'AnotherReactComponent', for: AnotherReactComponent},
      
      // Register a dynamic import
      {register: 'AsyncReactComponent', forAsync: function() { 
        return new Promise((resolve) => {
            require.ensure(['./components/MyComponent'], () => {
                resolve(require('./components/MyComponent'));
            });
          })
        }
      }
    ],

    // Should update lifecycle event (Optional) 
    // return false to cancel update
    shouldUpdate: function(target, query) {
        return true;
    },

    // Will update lifecycle event (Optional) 
    willUpdate: function(target, query) {
    },

    // Did update lifecycle event (Optional)
    didUpdate: function(target) {
    },
    
    // Will unmount habitats lifecycle event (Optional)
    willUnmountHabitats: function() {
    },
    
    // Did unmount habitats lifecycle event (Optional)
    didUnmountHabitats: function() {
    },

    // Did dispose lifecycle event (Optional)
    didDispose: function() {
    },

  });
}

// Always export a 'new' instance so it immediately evokes
exports.MyApp = new MyApp();
```

> Read the [Full spec here](readme.md#getting-started).