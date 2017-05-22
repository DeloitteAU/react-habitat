var ReactHabitat = require('react-habitat');

// Our top level components
var Banner = require('./components/Banner');
var Featurette = require('./components/Featurette');


function MyApp() {

    // Create a new react habitat bootstrapper
    this.domContainer = ReactHabitat.createBootstrapper({

        // Create a new container
        container: [

            // Register your top level component(s)
            {register: 'RBanner', for: Banner},
            {register: 'RFeaturette', for: Featurette}
        ]
    });

    // Optionally start a dom watcher to automatically wire up any new elements
    // that may be injected later (eg ajaxed HTML)
    // See dynamic.html for demo of this
    this.domContainer.startWatcher();

}

// Always export a 'new' instance so it immediately evokes
exports.MyApp = new MyApp();