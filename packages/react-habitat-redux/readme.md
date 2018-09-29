# React Habitat Redux ![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/react-habitat-redux.svg?branch=master)


*Looking for the older [v1.0 docs](https://github.com/DeloitteDigitalAPAC/react-habitat-redux/blob/9989af80d45e41ac80415423c5b347530896031b/readme.md)?*


This library brings [Redux](http://redux.js.org/) capabilities to [React-Habitat](https://github.com/DeloitteDigitalAPAC/react-habitat)

## Installing

**This library requires [react-habitat](https://github.com/DeloitteDigitalAPAC/react-habitat). v0.5.0 or greater**

Install with Node Package Manager (NPM)

`npm install react-habitat-redux --save`

This assumes that you’re using a package manager with a module bundler like [Webpack](http://webpack.github.io) or [Rollup](https://rollupjs.org/).


If you don’t yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactHabitatRedux` available as a global object, you can grab a pre-built version from the dist folder.

## Usage

You should first familirise yourself with React Habitat and [its docs](https://github.com/DeloitteDigitalAPAC/react-habitat#getting-started)

When configuring the React Habitat `ContainerBuilder`, you'll want to set the `factory` for a ReduxDomFactory instead of the default one and pass in your *store* like so:

```javascript
// Create a store
const store = configureStore();

// Create a container builder
const containerBuilder = new ReactHabitat.ContainerBuilder();

// Set a new 'Redux' factory for the store
containerBuilder.factory = new ReduxDomFactory(store);
```
It's important that you pass in the store object if you want redux 'connect' to work automatically.

Here is a full Bootstrapper class example:

```javascript
import ReactHabitat                 from 'react-habitat';
import { ReduxDomFactory }          from 'react-habitat-redux';
import { createStore }              from 'redux';

import configureStore               from './store/configureStore'
import SomeReactComponent           from './SomeReactComponent';
import AnotherReactComponent        from './AnotherReactComponent';

class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // Create a store
        const store = configureStore();

        const containerBuilder = new ReactHabitat.ContainerBuilder();

        // Set a new 'Redux' factory for the store
        containerBuilder.factory = new ReduxDomFactory(store);

        // Register your top level component(s)
        containerBuilder.register(SomeReactComponent).as('SomeReactComponent');
        containerBuilder.register(AnotherReactComponent).as('AnotherReactComponent');

        // Finally, set the container
        this.setContainer(containerBuilder.build());
    }
}

// Always export a 'new' instance so it immediately evokes
export default new MyApp();
```

## Who is Deloitte Digital?

**Part Business. Part Creative. Part Technology. One hundred per cent digital.**

Pioneered in Australia, Deloitte Digital is committed to helping clients unlock the business value of emerging technologies. We provide clients with a full suite of digital services, covering digital strategy, user experience, content, creative, engineering and implementation across mobile, web and social media channels.

[http://www.deloittedigital.com/au](http://www.deloittedigital.com/au)

## LICENSE (BSD-3-Clause)
Copyright (C) 2015, Deloitte Digital. All rights reserved.

React Habitat Redux can be downloaded from: https://github.com/DeloitteDigitalAPAC/react-habitat-redux

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
