import Bootstrapper from './Bootstrapper';
import Container from './Container';
import ContainerBuilder from './builder/ContainerBuilder';
import { createBootstrapper } from './classic/createBootstrapper';

export default {
	Bootstrapper,
	Container,
	ContainerBuilder,
	createBootstrapper, // Will be depreacted from this index soon
};
