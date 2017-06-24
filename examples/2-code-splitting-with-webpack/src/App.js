import ReactHabitat   from 'react-habitat';

class Main extends ReactHabitat.Bootstrapper {

	constructor(){

		super();

		// Create a new container builder
		const containerBuilder = new ReactHabitat.ContainerBuilder();

	    // Register our components that we want to expose to the DOM
		containerBuilder.register(() => import('./components/Featurette')).as('RFeaturette');
		containerBuilder.register(() => import('./components/Banner')).as('RBanner');

		this.setContainer(containerBuilder.build(), () => {
			this.startWatcher();
		});
	}
}

export const main = new Main();
