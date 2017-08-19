var ReactHabitat = require('react-habitat');

// Our top level components
var Banner = require('./components/Banner');
var Featurette = require('./components/Featurette');


function MyApp() {

    // Create a new react habitat bootstrapper
    this.app = ReactHabitat.createBootstrapper({

        // Create a new container
        container: [

            // Register your top level component(s)
            {register: 'RBanner', for: Banner},
            {register: 'RFeaturette', for: Featurette}
        ]
    });

    // Bind the update method onto the window for the dynamic demo
    window.updateHabitat = this.app.update.bind(this.app);
}

// Always export a 'new' instance so it immediately evokes
exports.MyApp = new MyApp();