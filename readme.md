![Deloitte Digital](https://raw.githubusercontent.com/DeloitteDigital/DDBreakpoints/master/docs/deloittedigital-logo-white.png)

# React Habitat

## React Habitat <3 Your CMS

React Habitat is designed for integrating React with your CMS. It's based of some basic
[container programming principles](https://en.wikipedia.org/wiki/Container_(abstract_data_type) and brings peace and order to your DOM.
This framework exists so you can get on with the fun stuff!

## When to use React Habitat

You should use React Habitat any time there is a backend framework rendering your HTML and you want one or multiple
[React components](https://facebook.github.io/react/docs/component-api.html) on the page(s).
For example sometimes there are only sections of your page that you want to be a React Component, then this framework is perfect for that.

React Habitat works great with:

- Sitecore
- Adobe Experience Manager
- Umbraco
- Drupal
- Joomla
- Wordpress
- Magento
- *...etc*

### When *not* to use it

Typically if you're building a full on one page React app that yanks data from restful API's... then this framework isn't really going to bring much benefit to you.
However you are definitely invited to use it if you want to.

## Features

- Simple and fast setup
- Pass data (props) to your components from HTML attributes
- Automatic data parsing
- All page child apps can still share the same components, stores, events etc. (Everything is connected)
- Implements an app lifecycle
- Simple to swap out components for others (The beauty of IOC containers)
- For advanced users, you can use different components for different build environments
- 100% W3C HTML5 Valid
- TypeScript definitions included

## Compatibility

- Supports Browsers IE8+ and all the evergreens.
- Requires ES6 (Babel is encouraged)

We recommend you use something like WebPack or Browserify when using this framework.

## Installing

Install with Node Package Manager (NPM)

`npm install --save-dev git+ssh://git@hub.deloittedigital.com.au:7999/fed/react-habitat.git#v0.1.4`



## Getting Started

The basic pattern for integrating React Habitat into your application is:

- Structure your app with inversion of control (IoC) in mind.
- Add React references.
- At application startup...
- Create a Container.
- Register React components.
- Set the container and store it for later use in the DOM.
- During application execution...
- Use the lifetime DOM scope to resolve instances of the components.

This getting started guide walks you through these steps for a simple React application.
This document assumes you already know:

- How to compile JSX
- How to use es6 modules; and
- How to bundle using something like webpack or browserify


#### 1. Create a bootstrapper class

The class must extend `ReactHabitat.Bootstrapper` and is to be the *entry* point of your app. So if you're using something like webpack or browserify then
this is file to point it to.

In the *constructor()* of the class you need to register your React components with it and then set the container. The container is later bound to the
DOM automatically.

In React Habitat, you'd register a component something like this

```javascript
    // Create a new container builder
    var container = new ReactHabitat.Container();

    // Register your component(s)
    container.register('SomeReactComponent', SomeReactComponent);

    // Finally, set the container
    this.setContainer(container);
```

For our sample application we need to register all of our components (classes) to be exposed to the DOM so things get wired up nicely.

```javascript
import ReactHabitat                 from 'react-habitat';
import SomeReactComponent           from './SomeReactComponent';
import AnotherReactComponent        from './AnotherReactComponent';

class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // Create a new container builder
        var container = new ReactHabitat.Container();

        // Register your top level component(s) (ie mini/child apps)
        container.register('SomeReactComponent', SomeReactComponent);
        container.register('AnotherReactComponent', AnotherReactComponent);

        // Finally, set the container
        this.setContainer(container);
    }
}

// Always export a 'new' instance so it immediately evokes
export default new MyApp();
```


#### 2. Application execution - render your components

During the web application execution you will want to make use of the components you registered. You do this by *resolving* them in the DOM from a scope.

When you resolve a component, a new instance of the object gets created (Resolving a component is roughly equivalent to calling 'new').

To *resolve* new instances your components you need to attach a `data-component` attribute to a `div` or a `span` element in the HTML. These elements should always
remain empty.

Set the `data-component` value to equal a component name you have registered in the container.

For instance:

```html
<div data-component="SomeReactComponent"></div>
```

Will be resolved by the following registration.

```javascript
container.register('SomeReactComponent', SomeReactComponent);
```

So, for our sample app we would do something like this

```html
<html>
    <body>
        <div data-component="SomeReactComponent"></div>
        <script src="myBundle.js" />
    </body>
</html>
```

When you view this page you will see a instance of `SomeReactComponent` automatically rendered in the div's place. In fact, you can add as many as you like and it
will render multiple instances.

For example. This is perfectly valid.

```html
<html>
    <body>

        <div data-component="SomeReactComponent"></div>
        <div data-component="SomeReactComponent"></div>
        <div data-component="SomeReactComponent"></div>

        <script src="myBundle.js" />
    </body>
</html>
```

Will render 3 instances of your component.

**Note** It's important that the output built javascript file is included at the end of the DOM just before the closing </body> tag.


#### 3. Passing properties *(props)* to your components

Resolving and registering components alone is not all that special, but passing data to it via html attributes is pretty useful. This allows the backend to
easily pass data to your components in a modular fashion.

To set properties you must prefix attributes with `data-prop-`

For example

`data-prop-title` would expose `title` as a property inside the component.


There are **two important things** to note when setting properties:

1. Hyphenated property names are converted to *camelCase*. Eg. `data-prop-my-title` would expose `myTitle` as a property in the component.
2. JSON and booleans are automatically parsed. Eg `data-prop-my-bool="true"` would expose the value of `true`, NOT the string representation `"true"` in the component.

Simple Example

```html
<div data-component="SomeReactComponent"
    data-prop-title="A nice title"
    data-prop-showTitle="true">
</div>
```

Would expose as

```javascript
class SomeReactComponent extends React.Component {
    constructor(props) {
        super(props);

        // props.title === "A nice title";      //> true
        // props.showTitle === true;            //> true
    }
}
```

JSON Example

```html
<div data-component="SomeReactComponent"
    data-prop-person="{'name': 'john', 'age': 22}"
    >
</div>
```

Would expose as

```javascript
class MyReactComponent extends React.Component {
    constructor(props) {
        super(props);

        // props.person.name === "john";      //> true
        // props.person.age === 22;           //> true
    }
}
```



## Want to contribute?

* Got an amazing idea to make this better?
* Found an annoying bug?

Please don't hesitate to raise an issue through GitHub or open a pull request to show off your fancy pants coding skills - we'll really appreciate it!

## Key Contributors

### Deloitte Digital Australia
* @jennasalau

## Who is Deloitte Digital?

**Part Business. Part Creative. Part Technology. One hundred per cent digital.**

Pioneered in Australia, Deloitte Digital is committed to helping clients unlock the business value of emerging technologies. We provide clients with a full suite of digital services, covering digital strategy, user experience, content, creative, engineering and implementation across mobile, web and social media channels.

[http://www.deloittedigital.com/au](http://www.deloittedigital.com/au)

## LICENSE (BSD-3-Clause)
Copyright (C) 2015, Deloitte Digital. All rights reserved.

React Habitat can be downloaded from: https://github.com/DeloitteDigitalAPAC/react-habitat

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
