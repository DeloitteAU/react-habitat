import ReactHabitat         from 'react-habitat';
import Banner               from './components/Banner';

class App extends ReactHabitat.Bootstrapper {

	constructor() {

		super();

		// Create a new container
		const containerBuilder = new ReactHabitat.ContainerBuilder();

		// Register our components that we want to expose to the DOM
		containerBuilder.register(Banner).as('RBanner');

		// This is how to load components dynamically in webpack 4 (see code splitting)
		containerBuilder.registerAsync(() => import('./components/Featurette')).as('RFeaturette');

		// Set the DOM container
		this.setContainer(containerBuilder.build());

	}
}

// Create a single instance of our app
const instance = new App();

// Bind the update method onto the window for the dynamic demo
// Alternatively we could have imported this file into another
// eg
//
// import App from './App';
//
// App.update();
//
window.updateHabitat = instance.update.bind(instance);

// Export the instance
export default instance;
