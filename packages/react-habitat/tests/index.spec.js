/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactHabitat from '../src';
import Bootstrapper from '../src/Bootstrapper';
import Container from '../src/Container';
import { createBootstrapper, _Mixin } from '../src/classic/createBootstrapper';

describe('Habitat API', () => {
	it('resolves a bootstrapper', () => {
		expect(ReactHabitat.Bootstrapper).toEqual(Bootstrapper);
	});

	it('resolves a container', () => {
		expect(ReactHabitat.Container).toEqual(Container);
	});

	it('resolves a classic mixin', () => {
		expect(ReactHabitat.createBootstrapper).toEqual(createBootstrapper);
	});
});
