![Deloitte Digital](https://raw.githubusercontent.com/DeloitteDigital/DDBreakpoints/master/docs/deloittedigital-logo-white.png)

# React Habitat ![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/react-habitat.svg?branch=master) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**v1.0 Released** 🎉 - Please see [migration guides](https://github.com/DeloitteDigitalAPAC/react-habitat/wiki).

> *Looking for the [v0.4 docs](https://github.com/DeloitteDigitalAPAC/react-habitat/tree/4e82be35a1d9b5f2c95d7957f277dbbd1ca89b64#react-habitat-)?*

## React Habitat <3 Your CMS

React Habitat is designed for integrating React with your CMS using the DOM as the interface. It's based of some basic
[container programming principles](https://en.wikipedia.org/wiki/Container_(abstract_data_type)) and brings peace and 
order to multi-page apps.

This framework exists so you can get on with the fun stuff!

## When to use React Habitat

You should use React Habitat any time there is a framework or CMS rendering your HTML and you want one or multiple
[React components](https://facebook.github.io/react/docs/component-api.html) on the page(s).
For example, sometimes there are only sections of your page that you want to be a React Component, this framework 
is perfect for that.

The idea behind this is that, rather than trying to initiate one or many React components; by either hard coding or 
using a Router. You switch it around so components "new up" themselves when required.

React Habitat works great with:

- Sitecore
- Adobe Experience Manager
- Hybris
- Umbraco
- Drupal
- Joomla
- WordPress
- Magento
- *... etc*

### When *not* to use it

Typically if you're building a single page application (SPA) with only a `<div id="app">` in the body tag ... then this 
framework isn't really going to bring many benefits to you. However, you are definitely invited to use it, if you want to.

## Features

- Tiny code footprint (only 4.4kb)
- **Redux** supported
- Pass data (props) to your components directly from HTML attributes and back again
- Automatic data/JSON parsing
- All page child apps can still share the same components, stores, events etc. (Everything is connected)
- Simple to swap out components for others (The beauty of IOC containers)
- For advanced users, you can use different components for different build environments
- 100% W3C HTML5 Valid
- TypeScript definitions included

## Table of Contents

- [Compatibility](#compatibility)
- [Installing](#installing)
- [Getting Started](#-getting-started)
- [Registering components](#registering-components)
  - [Concept](#registering-components)
  - [Passing options to register](#passing-options-to-register)
  - [Passing default props to register](#passing-default-props-to-register)
  - [Dynamic imports and code splitting](#dynamic-imports-and-code-splitting)
  - [Writing and using custom factories](#writing-and-using-custom-factories)
- [Resolving components](#resolving-components)
  - [Concept](#resolving-components)
  - [Passing props/properties to your components](#passing-properties-props-to-your-components)
  - [Passing data back again](#passing-values-back-again)
  - [Setting the Habitat's css class](#setting-the-habitats-css-class)
  - [Replace original node](#replace-original-node)
  - [Use encoded JSON in HTML attributes](#use-encoded-json-in-html-attributes)
- [Controlling Scope and Lifetime](#controlling-scope-and-lifetime)
  - [Changing the Habitat query selector](#changing-the-habitat-query-selector)
  - [Dynamic updates](#dynamic-updates)
  - [Bootstrapper lifecycle events](#bootstrapper-lifecycle-events)
  - [Unmount react Habitats](#unmount-react-habitats)
  - [Disposing the container](#disposing-the-container)
- [Examples](https://github.com/DeloitteDigitalAPAC/react-habitat/tree/master/examples)
- [Contribute](#want-to-contribute)
- [License information](#license-bsd-3-clause)
- [Change log](https://github.com/DeloitteDigitalAPAC/react-habitat/blob/master/CHANGELOG.md)


## Compatibility

- Supports Browsers IE9+ and all the evergreens.
- ES5, ES6/7 & TypeScript
- React v15 and up

Polyfills

- IE9-11 Will require a [Promise Polyfill](http://babeljs.io/docs/usage/polyfill/)
- IE9-10 Will require a [Object.assign Polyfill](http://babeljs.io/docs/usage/polyfill/)

We highly recommend you use something like [WebPack](https://webpack.github.io/) or [Browserify](http://browserify.org/) when using this framework.

## Installing

Install with [NPM](http://npmjs.com/)

`npm install --save react-habitat`

This assumes that you’re using a package manager with a module bundler like [Webpack](http://webpack.github.io) or [Rollup](https://rollupjs.org/).

If you don’t use a module bundler, and would prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactHabitat` available as a global object, you can grab a pre-built version from the dist folder.

## 🎓 Getting Started

**Using ES5?** Read the [ES5 spec here](readme-in-es5.md#getting-started).

The basic pattern for integrating React Habitat into your application is:

- Create a Container Builder.
- Register React components.
- Set the container for later use in the DOM.
- At application execution ...
- Use the DOM scope to resolve instances of the components.

This getting started guide walks you through these steps for a simple React application.
This document assumes you already know:

- How to compile JSX; and
- How to bundle using something like webpack or browserify

#### 1. Create a bootstrapper class

The class must extend `ReactHabitat.Bootstrapper` and is intended to be an *[entry](https://webpack.github.io/docs/configuration.html#entry)* point of your bundled app. So if you're using something like webpack or browserify then this is the file to point it too.

In the *constructor()* of the class you need to register your React components with it and then set
the container. The container is later bound to the DOM automatically so your React components self-initiate.

In React Habitat, you'd register a component 'as' a unique key with something like this:

```javascript
containerBuilder.register(SomeReactComponent).as('SomeReactComponent');
```

So for our sample application, we need to register all of our components to be exposed to the DOM so things get wired up nicely.

We also need to build and store the container so it can be used to resolve components later

```javascript
import ReactHabitat                 from 'react-habitat';
import SomeReactComponent           from './SomeReactComponent';

class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // Create a new container builder:
        const builder = new ReactHabitat.ContainerBuilder();

        // Register a component:
        builder.register(SomeReactComponent).as('SomeReactComponent');

        // Or register a component to load on demand asynchronously:
        builder.registerAsync(() => System.import('./AnotherReactComponent')).as('AnotherReactComponent');

        // Finally, set the container:
        this.setContainer(builder.build());
    }
}

// Always export a 'new' instance so it immediately evokes:
export default new MyApp();
```

By default ReactHabitat ships with a plain ReactDOM factory.

**If you are using Redux**

You will need to use a different factory. Please install & configure the [react-habitat-redux library](https://github.com/DeloitteDigitalAPAC/react-habitat-redux). Then continue with step 2 below.

Alternatively learn how to [write and use your own custom factory](#writing-and-using-custom-factories).

**If you are using TypeScript**

You will need to import ReactHabitat using `import * as ReactHabitat from 'react-habitat'` syntax in order to avoid 'module has no default export' error.

#### 2. Application execution - resolve your components

During the web application execution, you will want to make use of the components you registered. You do this by *resolving* them in the DOM from a scope.

When you resolve a component, a new instance of the object gets created (Resolving a component is roughly equivalent to calling 'new').

To *resolve* new instances of your components, you need to attach a `data-component` attribute to a `div` or a `span` element in the HTML.
Any child components should be nested inside the React components themselves.

Set the `data-component` value to equal a component key you have registered the component *as*.

For instance:

```html
<div data-component="SomeReactComponent"></div>
```

Will be resolved by the following registration.

```javascript
container.register(SomeReactComponent).as('SomeReactComponent');
```

So, for our sample app, we would do something like this

```html
<html>
    <body>
        <div data-component="SomeReactComponent"></div>
        <script src="myBundle.js" />
    </body>
</html>
```

When you view this page you will see an instance of `SomeReactComponent` automatically rendered in the div's
place. In fact, you can add as many as you like and it will render multiple instances.

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

> ⚠️ It's important that the output built javascript file is included at the end of the DOM just before the closing body tag.

Resolving and registering components alone is not all that special, but passing data to it via HTML attributes is pretty useful. This allows the backend to
easily pass data to your components in a modular fashion. To do this you use [predefined prefix's](#passing-properties-props-to-your-components)
such as `data-prop`.

For example, the following would create a new `MyReactComponent` instance with `title` and `colour` props.

```html
<div
    data-component="MyReactComponent"
    data-prop-title="My Title"
    data-prop-colour="#BADA55"
>
</div>
```

**Going Further**

The getting start guide gives you an idea of how to use React Habitat, but there's a lot more you can do.

Learn more about:

- [Passing props to your components](#passing-properties-props-to-your-components) including JSON.
- [Passing data back again](#passing-values-back-again).
- [Ways to register components](#registering-components) that adds flexibility.
- [Options available when resolving components](#resolving-components).

**Still Need Help?**

Please ask questions on [StackOverflow](https://stackoverflow.com/questions/tagged/react-habitat) tagged with `react-habitat`
(We have notifications turned on).

**[⬆ back to top](#table-of-contents)**

# 📖 API

## Registering components

You register components with React Habitat by creating a `ReactHabitat.ContainerBuilder` and informing the builder which
components to expose to the DOM.

Each component is exposed to the DOM using the `as()` method on the `ContainerBuilder`.

```javascript
// Create a new builder:
const builder = new ReactHabit.ContainerBuilder();

// Register SomeComponent and expose it to the DOM as 'MySomeComponent':
builder.register(SomeComponent).as('MySomeComponent');

// Build the container to finalise registrations:
const container = builder.build();
```

### Passing options to register

You can pass render options with each registrations using the `withOptions()` method on the `ContainerBuilder`.

|Property|Type|Description|
|---|---|---|
|**tag**|string *(optional)*|The tag to use for the rendered Habitat that houses the component eg 'span'
|**className**|string *(optional)*|The Habitat's CSS class name
|**replaceDisabled**|boolean *(optional)*|If true, the original node will be left in the dom. False by default

Example using `withOptions()`:

```javascript
// Register SomeComponent and expose it to the DOM as 'MySomeComponent'
builder
    .register(SomeComponent)
    .as('MySomeComponent')
    .withOptions({
        tag: 'div',
        className: 'myHabitat',
    });
```

You can also define *default* options for *all* registrations by passing the options object in as the first argument when
creating a new `ContainerBuilder` instance.

Example setting defaults for all registrations:

```javascript
// Register SomeComponent and expose it to the DOM as 'MySomeComponent':
const builder = new ContainerBuilder({
    tag: 'div',
    className: 'myHabitat',
});
```

> ⚠️ options can also be configured [with HTML attributes](#resolving-components).
*Any options defined with HTML attributes will always take precedence.*

### Passing default props to register

Typically, you would define the default props in the React component itself. However, there may be instances where you
would like different defaults for multiple registrations.

You can pass default props with each registration using the `withDefaultProps()` method on the `ContainerBuilder`.

```javascript
// Register SomeComponent and expose it to the DOM as 'MySomeComponent'
builder
    .register(SomeComponent)
    .as('MySomeComponent')
    .withDefaultProps({
        title: 'My new default title'
    });
```

> ⚠️ `proxy` is a React Habitat reserved prop name. Read more about using the proxy in [passing data back again](#passing-values-back-again).


**[⬆ back to top](#table-of-contents)**

## Dynamic imports and code splitting

React Habitat supports resolving components asynchronously by returning Promises.
Use `registerAsync` to define asynchronous registrations, pass in a function that returns a Promise, that resolves to a React component.

For example:

```javascript
container
    .registerAsync(() => new Promise((resolve, reject) => {
        // Do async work to get 'component', then:
        resolve(component);
    }))
    .as('AsyncReactComponent');
```

React Habitat has no restrictions on how you want to resolve your components however this does enable you to define code split points.

**Code splitting** is one great feature that means our visitors don't need to download the entire app before they can use it.
Think of code splitting as incrementally download your application only as its needed.

While there are other methods for code splitting we will use Webpack for these examples.

Webpack 2 & 3 treats `System.import()` as a [split-point](https://webpack.js.org/guides/code-splitting-async/) and puts the requested module into a separate chunk.

So for example, we could create a split point using `System.import()` like this:

```javascript
container.registerAsync(() => System.import('./components/MyComponent')).as('MyComponent');
```

`registerAsync` expects a function that returns a `Promise`, that resolves with a React Component. Since `System.import` IS a Promise, that allows us to use it directly.

Here is an example using `require.ensure()` to define a [split-point in webpack 1](https://webpack.github.io/docs/code-splitting.html)

```javascript
container
    .registerAsync(() => new Promise((resolve) => {
        require.ensure(['./components/MyComponent'], () => {
            resolve(require('./components/MyComponent'));
        });
    }))
    .as('AsyncReactComponent');
```

**[⬆ back to top](#table-of-contents)**

## Writing and using custom factories

A factory is used to define how components are injected into the DOM. The [default factory](https://github.com/DeloitteDigitalAPAC/react-habitat/blob/master/src/factories/ReactDomFactory.js) is simple wrapper of ReactDOM.

Where as the [ReactHabitatRedux one](https://github.com/DeloitteDigitalAPAC/react-habitat-redux/blob/master/src/ReduxDomFactory.js) wraps Components in a React Redux Provider. You can write custom factories do what ever you want with components and control how they are added to the dom.

A factory is simply a plain javascript class that must have two methods implemented `inject` and `dispose`.

Example:

```javascript
class MyCustomFactory {

    inject(module, props, target) {
        // ...
    }

    dispose(target) {
        // ...
    }
}
```

#### Inject

`inject(module, props, target)`

- **module** is the component that was registered.
- **props** is the props for the component.
- **target** is the html node intended for the module/component.

#### Dispose

`dispose(target)`

- **target** is the html node containing the module/component that needs to be teared down.

### Using factories

To define a factory, just set `factory` on the container builder before calling build.

```javascript
const containerBuilder = new ReactHabitat.ContainerBuilder();

containerBuilder.factory = new MyCustomFactory();
```

> If you create a compatible factory, please let us know so we can include a link to it from this page.

**[⬆ back to top](#table-of-contents)**

## Resolving components

After you have registered your components, you can resolve components from the built container inside your DOM. You do this by setting the `data-component` attribute on a HTML element such as a `div`, `span` or `input` etc.

```html
<div data-component="MyComponent"></div>
```

This will resolve and render a component that was registered `as('MyComponent')`. It's important to note that
this "target" type element by default will be replaced with what we refer to as a Habitat that houses your component.
However, `<input />`'s will always remain in the DOM so it's data is available on a form post (see [passing data back again](#passing-values-back-again)).

In addition to the [prop attributes](#passing-properties-props-to-your-components), some Habitat options can also be configured with attributes.

|Attribute|Description|
|---|---|
|[data-habitat-class](#setting-the-habitats-css-class)|Set the Habitat's css class
|[data-habitat-no-replace](#replace-original-node)|Control the original node replacement behaviour

> ⚠️ options can also be configured [with a registration](#passing-options-to-register).
*Any options defined with HTML attributes will always take precedence.*

**[⬆ back to top](#table-of-contents)**

## Passing properties *(props)* to your components

To set props you have a few choices. You can use all of these or only some (they merge) so just use what's suits you
best for setting properties.

|Attribute|Description|
|---|---|
|[data-props](#data-props)|Maps [encoded JSON](#use-encoded-json-in-html-attributes) to props.
|[data-prop-*](#data-prop-)|This [prefix](#prefix) maps in strings, booleans, null, array or [encoded JSON](#use-encoded-json-in-html-attributes) to a prop.
|[data-n-prop-*](#data-n-prop-)|This [prefix](#prefix) maps in numbers and floats to a prop.
|[data-r-prop-*](#data-r-prop-)|This [prefix](#prefix) maps a reference to an object that exists on the global scope (window) to a prop.

> ⚠️ `proxy` is a reserved prop name. Read more about using the proxy in [passing data back again](#passing-values-back-again).

### Prefix

With an attribute *prefix* the **\*** may be replaced by any name. This allow's you to define the property name.
Property names must be all lower-case and hyphens will be *automatically converted* to camel case.

For example:

`data-prop-title` would expose `title` on the props object inside the component.

`data-prop-my-title` would expose `myTitle` on the props object inside the component.

### data-props

Set component props via an [encoded JSON](#use-encoded-json-in-html-attributes) string on the `data-props` attribute.

For example:

```html
<div data-component="SomeReactComponent" data-props='{"title": "A nice title"}'></div>
```

### data-prop-*

Set a component prop via prefixing attributes with `data-prop-`.

For example:

`data-prop-title` would expose `title` as a property inside the component.

> ⚠️ *JSON*, *booleans* & *null* are automatically parsed. Eg `data-prop-my-bool="true"` would expose the value of `true`, NOT the string representation `"true"`.

Passing in an array of objects will require you to use HTML encoded characters for quotes etc i.e &quot;foo&quot; will replace "foo".

Simple example:

```html
<div data-component="SomeReactComponent"
    data-prop-title="A nice title"
    data-prop-show-title="true">
</div>
```

Would expose props as:

```javascript
class SomeReactComponent extends React.Component {

    constructor(props) {
        super(props);

        props.title === "A nice title";  //> true
        props.showTitle === true;        //> true
    }

    render() {
        return <div>{ this.props.showTitle ? this.props.title : null }</div>;
    }
}
```

JSON example:

```html
<div
    data-component="SomeReactComponent"
    data-prop-person='{"name": "john", "age": 22}'>
</div>
```

Would expose as:

```javascript
class MyReactComponent extends React.Component {
    constructor(props) {
        super(props);

        return (
            <div>
                Name: {this.props.person.name}
                Age: {this.props.person.age}
            </div>
        );
    }
}
```

### data-n-prop-*

Set a component prop with type [number] via prefixing attributes with `data-n-prop-`.

For example `data-n-prop-temperature="33.3"` would expose the float value of 33.3 and not the string representation '33.3'.

This is handy if you know that a property is always going to be a number or float.

### data-r-prop-*

Referenced a global variable in your component prop via prefixing attributes with `data-r-prop-`.

For example:

```html
<script>
    var foo = window.foo = 'bar';
</script>

<div data-component="SomeReactComponent" data-r-prop-foo="foo"></div>
```

This is handy if you need to share properties between Habitats or you need to set JSON onto the page.

**[⬆ back to top](#table-of-contents)**

## Passing values back again

It can be handy to pass values back again, particularly for inputs so the backend frameworks can see any changes or read data.

*Every* React Habitat instance is passed in a prop named `proxy`, this is a reference the original dom element.

> ⚠️ only `<inputs />` are left in the DOM by default. To keep a generic element in the DOM, set the `data-habitat-no-replace="true"` attribute.

So for example, we could use `proxy` to update the value of an input like so

```html
<input id="personId" type="hidden" data-component="personLookup" />
```

Somewhere inside the component

```javascript
this.props.proxy.value = '1234'
```

Sometimes you may additionally need to call `this.props.proxy.onchange()` if you have other scripts listening for this event.

**[⬆ back to top](#table-of-contents)**

### Setting the Habitat's CSS class

You can set a custom CSS class on the Habitat element by setting the `data-habitat-class` attribute on the target element.
Alternatively you can use the [withOptions](#passing-options-to-register) method on the registration.

Example:

`<div data-component="MyComponent" data-habitat-class="my-css-class"></div>`

Will result in the following being rendered:

`<div data-habitat="C1" class="my-css-class">...</div>`

**[⬆ back to top](#table-of-contents)**

### Replace original node

By default only `<inputs />` are left in the DOM when a React Habitat is created.

To keep a generic element in the DOM, set the `data-habitat-no-replace="true"` attribute.

Alternatively you can use the [withOptions](#passing-options-to-register) method on the registration.

## Use encoded JSON in HTML attributes

When passing JSON to an attribute you need to remember its actually JSON inside a string,
you will need to encode the value so that content can be preserved and properly rendered.

> ⚠️ Please note using `data-r-prop` instead may be better suited for you.

As a general rule, escape the following characters with HTML entity encoding:

- `&` --> `&amp;`
- `<` --> `&lt;`
- `>` --> `&gt;`
- `"` --> `&quot;`
- `'` --> `&#x27;`
- `/` --> `&#x2F;`

Example:

`<div data-props="{&quot;foo&quot;&colon; &quot;bar&quot;}"></div>`

Additionally, an encoder may replace [extended ASCII characters](https://en.wikipedia.org/wiki/Extended_ASCII) with the equivalent HTML entity encoding.

Most backend systems are capable of doing this automatically. An alternative is to use the [data-r-prop-*](#data-r-prop-) option.

**Should I use attribute Single of Double Quotes?**

Double quotes around attributes values are the most common. There is a known hack of wrapping JSON attributes
with single quotes and escaping nested single quotes.

Example:

`<div data-props='{"restaurant": "Bob\'s bar and grill"}'></div>`

*We will use this method in the docs to maintain readability. However, we strongly recommend you encode all JSON inside attributes.*

**[⬆ back to top](#table-of-contents)**


## Controlling Scope and Lifetime

- [Changing the Habitat query selector](#changing-the-habitat-query-selector)
- [Dynamic updates](#dynamic-updates)
- [Update lifecycle](#update-lifecycle)
- [Disposing the container](#disposing-the-container)

**[⬆ back to top](#table-of-contents)**

### Changing the Habitat query selector

*Default: 'data-component'*

By default React Habitat will resolve components via the `data-component` attribute. You can configure this by assigning
the `componentSelector` property in your constructor.

It will accept any string containing any valid attribute name.

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        this.componentSelector = 'data-myComponents';
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Dynamic Updates

`update()`

The update method will scan the DOM for any new targets that require wiring up (i.e after ajaxing in some HTML).

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    someMethod() {
        // This will scan the entire document body
        this.update();
    }
}
```
By default *update()* will scan the entire body, however, a node can optionally be passed in for better
performance if you know where the update has occurred.

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    someMethod() {
        // Will scan just the children of the element with id 'content':
        this.update(document.getElementById('content'))
    }
}
```

You can call this method from somewhere else in your app by importing it:

```javascript
import MyApp from './MyApp';

// ...

MyApp.update();
```

Or you can expose it onto the window object for legacy code.

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    constructor() {

        // ...

        window.updateHabitat = this.update.bind(this);
    }
}

// ...

window.updateHabitat();
```

**[⬆ back to top](#table-of-contents)**

### Bootstrapper Lifecycle Events

`ReactHabitat.Bootstrapper` has "lifecycle methods" that you can override to run code at particular times
in the process.

|Method|Description
|---|---
|`shouldUpdate(node)`|Called when an update has been requested. Return false to cancel the update.
|`willUpdate(node)`|Called when an update is about to take place.
|`didUpdate(node)`|Called after an update has taken place.
|`willUnmountHabitats()`|Called when all active React Habitats are about to be unmounted.
|`didUnmountHabitats()`|Called after all active React Habitats have been unmounted.
|`didDispose()`|Called after all active React Habitats have been unmounted and the container released.

> An "update" is the event when registrations are resolved and a React mount will/did occur.

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    shouldUpdate(node) {
        // Dont allow updates on div's:
        if (node.tagName === 'div') {
            return false;
        }
    }

    willUpdate(node) {
        console.log('I am about to update.', node);
    }

    didUpdate(node) {
        console.log('I just updated.', node);
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Unmount React Habitats

To unmount all React Habitat instances. Call the `unmountHabitats()` method.

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // ...

        this.unmountHabitats();
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Disposing the container

To unload the container and remove all React Habitat instances. Call the `dispose()` method.

Example:

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // ...

        this.dispose();
    }
}
```

**[⬆ back to top](#table-of-contents)**


## Want to contribute?

* Got an amazing idea to make this better?
* Found an annoying bug?

Please don't hesitate to raise an issue through GitHub or open a pull request to show off your fancy pants coding skills - we'll really appreciate it!

## Key Contributors

* @jenna_salau

## Who is Deloitte Digital?

**Part Business. Part Creative. Part Technology. One hundred per cent digital.**

Pioneered in Australia, Deloitte Digital is committed to helping clients unlock the business value of emerging technologies. We provide clients with a full suite of digital services, covering digital strategy, user experience, content, creative, engineering and implementation across mobile, web and social media channels.

[http://www.deloittedigital.com/au](http://www.deloittedigital.com/au)

## LICENSE (BSD-3-Clause)
Copyright (C) 2017, Deloitte Digital. All rights reserved.

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

**[⬆ back to top](#table-of-contents)**
