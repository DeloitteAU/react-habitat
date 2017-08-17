import ReactHabitat   from 'react-habitat';

// Our top level react components
import Banner       from './components/Banner';
import Featurette   from './components/Featurette';

class Main extends ReactHabitat.Bootstrapper {

	constructor() {

		super();

		// Create a new container
		const containerBuilder = new ReactHabitat.ContainerBuilder();

		// Register our components that we want to expose to the DOM
		containerBuilder.register(Banner).as('RBanner');
		containerBuilder.register(Featurette).as('RFeaturette');

		// Set the DOM container
		this.setContainer(containerBuilder.build());
	}
}

const instance = new Main();

export default instance;
