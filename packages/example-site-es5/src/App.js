var ReactHabitat = require('react-habitat');

// React component
var Banner = require('./components/Banner');

function MyApp() {

    // Create a new react habitat bootstrapper
    this.app = ReactHabitat.createBootstrapper({

       // default options (optional)
       defaultOptions: {
          tag: 'div',                 // (Optional)
          className: 'myHabitat',     // (Optional)
          replaceDisabled: false      // (Optional)
       },

       // Create a new container
        container: [
            // Register your component(s)
            {register: 'RBanner', for: Banner},

	          // Register a dynamic component (code splitting)
            {register: 'RFeaturette', forAsync: function() {
                return new Promise(function(resolve) {
                   require.ensure(['./components/Featurette'], function() {
                      resolve(require('./components/Featurette'));
                   })
                })
             }}
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
       }
    });

    // Bind the update method onto the window for the dynamic demo
    window.updateHabitat = this.app.update.bind(this.app);
}

// Always export a 'new' instance so it immediately evokes
exports.MyApp = new MyApp();