import 'babel-polyfill';    // React Habitat requires Object.assign pollyfill for old IE support
import * as ReactHabitat from 'react-habitat';

// Our top level react components
import Banner       from './components/Banner';
import Featurette   from './components/Featurette';

class Main extends ReactHabitat.Bootstrapper {

	constructor() {

		super();

		// Create a new container builder
		const containerBuilder: ReactHabitat.IContainerBuilder = new ReactHabitat.ContainerBuilder();

		// Register our components that we want to expose to the DOM
		containerBuilder.register(Banner).as('RBanner')
		containerBuilder.register(Featurette).as('RFeaturette');

		// Set the DOM container
		this.setContainer(containerBuilder.build());

	}

}

// Create a single instance of our app
const instance = new Main();

// Bind the update method onto the window for the dynamic demo
// Alternatively we could have imported this file into another
// eg
//
// import App from './App';
//
// App.update();
//
declare global {
	interface Window { updateHabitat?: (Node?) => void }
}
window.updateHabitat = instance.update.bind(instance);

// Export the instance
export default instance;
