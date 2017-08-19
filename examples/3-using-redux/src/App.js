import 'babel-polyfill';    // React Habitat requires Object.assign pollyfill for old IE support
import ReactHabitat         from 'react-habitat';
import { createStore }		from 'redux';
import reducer 				from './reducers';
import ReduxDomFactory		from './ReduxDomFactory';

class App extends ReactHabitat.Bootstrapper {

	constructor() {

		super();

		// Create a new container
		const containerBuilder = new ReactHabitat.ContainerBuilder();

		// Create a redux store
		const store = createStore(
			reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // So we can debug redux in browser extension (optional)
		);

		// Set the container to use our redux factory
		containerBuilder.factory = new ReduxDomFactory(store);

		// Register our components that we want to expose to the DOM
		containerBuilder.registerAsync(System.import('./containers/AlbumCollection')).as('RAlbumCollection');
		containerBuilder.registerAsync(System.import('./containers/AddAlbumForm')).as('RAddAlbumForm');

		// Set the DOM container
		this.setContainer(containerBuilder.build());

	}
}

// Export single instance
export default new App();
