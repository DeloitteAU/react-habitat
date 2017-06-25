![Deloitte Digital](https://raw.githubusercontent.com/DeloitteDigital/DDBreakpoints/master/docs/deloittedigital-logo-white.png)

# React Habitat ![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/react-habitat.svg?branch=master)

*Looking for the [old docs](https://github.com/DeloitteDigitalAPAC/react-habitat/tree/4e82be35a1d9b5f2c95d7957f277dbbd1ca89b64#react-habitat-)?*

## React Habitat <3 Your CMS

React Habitat is designed for integrating React with your CMS using the DOM as the interface. It's based of some basic
[container programming principles](https://en.wikipedia.org/wiki/Container_(abstract_data_type)) and brings peace and order to multi page apps.

This framework exists so you can get on with the fun stuff!

## When to use React Habitat

You should use React Habitat any time there is a framework or CMS rendering your HTML and you want one or multiple
[React components](https://facebook.github.io/react/docs/component-api.html) on the page(s).
For example sometimes there are only sections of your page that you want to be a React Component, then this framework is perfect for that.

The idea behind this is that, rather than trying to initiate one or many React components; by either hard coding or using a Router. You switch it around so components "new up" themselves when required.

React Habitat works great with:

- Sitecore
- Adobe Experience Manager
- Hybris
- Umbraco
- Drupal
- Joomla
- WordPress
- Magento
- *...etc*

### When *not* to use it

Typically if you're using a react router... then this framework isn't really going to bring much benefit to you. 
However you are definitely invited to use it if you want to.

## Features

- Tiny code footprint (only 8KB)
- **Redux** supported
- Pass data (props) to your components directly from HTML attributes and back again
- Automatic data/JSON parsing
- All page child apps can still share the same components, stores, events etc. (Everything is connected)
- Simple to swap out components for others (The beauty of IOC containers)
- For advanced users, you can use different components for different build environments
- 100% W3C HTML5 Valid
- TypeScript definitions included

## Table of contents

- [Compatibility](#compatibility)
- [Installing](#installing)
- [Getting Started](#getting-started)
- [Registering components](#registering-components)
  - [Passing options to register](#passing-options-to-register)
  - [Passing default props to register](#passing-default-props-to-register)
  - [Dynamic imports and code splitting](#dynamic-imports-and-code-splitting)
- [Resolving components](#resolving-components)
  - [Passing props/properties to your components](#passing-properties-props-to-your-components)
  - [Passing data back again](#passing-values-back-again)
  - [Setting the habitats css class](#setting-the-habitats-css-class)
  - [Replace original node](#replace-original-node)
  - [Use encoded JSON in HTML attributes](#use-encoded-json-in-html-attributes)
- [Controlling Scope and Lifetime](#controlling-scope-and-lifetime)
  - [Changing the habitat query selector](#changing-the-habitat-query-selector)
  - [Dynamic updates](#dynamic-updates)
  - [Update lifecycle](#update-lifecycle)
  - [Start the dom watcher](#start-watcher)
  - [Stop the dom watcher](#stop-watcher)
  - [Disposing the container](#disposing-the-container)
- [Contribute](#want-to-contribute)
- [License information](#license-bsd-3-clause)
- [Examples](https://github.com/DeloitteDigitalAPAC/react-habitat/tree/master/examples)
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

`npm install --save-dev react-habitat`

This assumes that you’re using a package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/).

If you don’t use a module bundler, and would prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactHabitat` available as a global object, you can grab a pre-built version from the dist folder.

## Getting Started

**Using ES5?** Read the [ES5 version here](readme-in-es5.md#getting-started).

The basic pattern for integrating React Habitat into your application is:

- Create a Container Builder.
- Register React components.
- Set the container for later use in the DOM.
- At application execution...
- Use the DOM scope to resolve instances of the components.

This getting started guide walks you through these steps for a simple React application.
This document assumes you already know:

- How to compile JSX; and
- How to bundle using something like webpack or browserify

#### 1. Create a bootstrapper class

The class must extend `ReactHabitat.Bootstrapper` and is intended to be an *[entry](https://webpack.github.io/docs/configuration.html#entry)* point of your bundled app. So if you're using something like webpack or browserify then this is file to point it too.

In the *constructor()* of the class you need to register your React components with it and then set
the container. The container is later bound to the DOM automatically so your React components self-initiate.

In React Habitat, you'd register a component 'as' a unique key something like this

```javascript
containerBuilder.register(() => SomeReactComponent).as('SomeReactComponent');
```

So for our sample application we need to register all of our components to be exposed to the DOM so things get wired up nicely.

We also need to build and store the container so it can be used to resolve components later

```javascript
import ReactHabitat                 from 'react-habitat';
import SomeReactComponent           from './SomeReactComponent';
import AnotherReactComponent        from './AnotherReactComponent';

class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        // Create a new container builder
        const builder = new ReactHabitat.ContainerBuilder();

        // Register component(s)
        builder.register(() => SomeReactComponent).as('SomeReactComponent');
        builder.register(() => AnotherReactComponent).as('AnotherReactComponent');

        // Finally, set the container
        this.setContainer(builder.build());
    }
}

// Always export a 'new' instance so it immediately evokes
export default new MyApp();
```

**If you are using Redux**

You will need to use a different container. Please install & configure the [react-habitat-redux library](https://github.com/DeloitteDigitalAPAC/react-habitat-redux). Then continue with step 2 below.

#### 2. Application execution - resolve your components

During the web application execution you will want to make use of the components you registered. You do this by *resolving* them in the DOM from a scope.

When you resolve a component, a new instance of the object gets created (Resolving a component is roughly equivalent to calling 'new').

To *resolve* new instances of your components you need to attach a `data-component` attribute to a `div` or a `span` element in the HTML.
Any child components should be nested inside the React components themselves.

Set the `data-component` value to equal a component key you have registered the component *as*.

For instance:

```html
<div data-component="SomeReactComponent"></div>
```

Will be resolved by the following registration.

```javascript
container.register(() => SomeReactComponent).as('SomeReactComponent');
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

When you view this page you will see a instance of `SomeReactComponent` automatically rendered in the div's
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

> **Note** It's important that the output built javascript file is included at the end of the DOM just before the closing body tag.

Resolving and registering components alone is not all that special, but passing data to it via html attributes is pretty useful. This allows the backend to
easily pass data to your components in a modular fashion. To do this you use [predefined prefix's](#passing-properties-props-to-your-components) 
such as `data-prop`. 

For example the following would create a new `MyReactComponent` instance with `title` and `colour` props.

```html
<div
    data-component="MyReactComponent"
    data-prop-title="My Title"
    data-prop-color="#BADA55"
>
</div>
```

**Going Further**

The getting start guide gives you an idea how to use React Habitat, but there's a lot more you can do.

- Learn more about [passing props to your components](#passing-properties-props-to-your-components) including JSON.
- Learn how you can [pass data back again](#passing-values-back-again).
- Learn about the [ways to register components](#registering-components) that adds flexibility.
- Learn about the [options available when resolving components](#resolving-components).

**Still Need Help?**

Please ask questions on [StackOverflow](https://stackoverflow.com/questions/tagged/react-habitat) tagged with `react-habitat` 
(We have notifications turned on).

**[⬆ back to top](#table-of-contents)**


## Registering components

You register components with React Habitat by creating a `ReactHabitat.ContainerBuilder` and informing the builder which
components to expose to the DOM.

Each component is exposed to the DOM using the `as()` method on the `ContainerBuilder`.

```javascript
// Create a new builder
const builder = new ReactHabit.ContainerBuilder();

// Register SomeComponent and expose it to the DOM as 'MySomeComponent'
builder.register(() => SomeComponent).as('MySomeComponent');

// Build the container to finalise registrations
const container = builder.build();
```

`register()` must be passed a function that returns a React component OR a Promise that resolves with a React component.

### Passing options to register

You can pass options with each registrations using the `withOptions()` method on the `ContainerBuilder`.

|Property|Type|Description|
|---|---|---|
|**tag**|string *(optional)*|The tag to use for the rendered habitat that houses the component eg 'span'
|**className**|string *(optional)*|The habitats css class name
|**replaceDisabled**|boolean *(optional)*|If true, the original node will be left in the dom. False by default

Example

```javascript
// Register SomeComponent and expose it to the DOM as 'MySomeComponent'
builder
    .register(() => SomeComponent)
    .as('MySomeComponent')
    .withOptions({
        tag: 'div',
        className: 'myHabitat',
    });
```
> **Note** options can also be configured [with HTML attributes](#resolving-components). 
*Any options defined with HTML attributes will always take precedence.*

### Passing default props to register

Typically you would define the default props in the React component itself. However, there may be instances where you
would like different defaults for multiple registrations.

You can pass default props with each registrations using the `withDefaultProps()` method on the `ContainerBuilder`.

```javascript
// Register SomeComponent and expose it to the DOM as 'MySomeComponent'
builder
    .register(() => SomeComponent)
    .as('MySomeComponent')
    .withDefaultProps({
        title: 'My new default title'
    });
```

**[⬆ back to top](#table-of-contents)**

## Dynamic imports and code splitting

React Habitat supports resolving components asynchronously by returning Promises. 
To define async registrations, return a Promise (that resolves to a component) instead of a component directly.

For example

```javascript
container
    .register(() => {
        return new Promise((resolve, reject) => {
            // .. do async work to get 'component', then
            resolve(component);
        }) 
    })
    .as('AsynReactComponent');
```

React Habitat has no restrictions on how you want to resolve your components however this does enable you to define code split points.

**Code splitting** is one great feature that means our visitors dont need to download the entire app before they can use it.
Think of code splitting as incrementally download your application only as its needed.

While there are other methods for code splitting we will use Webpack for these examples.

Webpack 2 treats `import()` as a [split-point](https://webpack.js.org/guides/code-splitting-async/) and puts the requested module into a separate chunk. 

So for example, we could create a split point using `import()` like this:

```javascript
container
    .register(() => {
	    return new Promise((resolve, reject) => {
            import('./components/MyComponent').then((MyComponent) => {
                resolve(MyComponent);
            }).catch((err) => {
                reject(err);
            });
        });
    })
    .as('AsynReactComponent');
```

**HOWEVER**, since `import()` actually returns a Promise, we can actually simplify the above to:

```javascript
container.register(() => import('./components/MyComponent')).as('AsynReactComponent');
```

Here is an example using `require.ensure()` to define a [split-point in webpack 1](https://webpack.github.io/docs/code-splitting.html)

```javascript
container
    .register(() => {
        return new Promise((resolve) => {
            require.ensure(['./components/MyComponent'], () => {
                resolve(require('./components/MyComponent'));
            });
        });
    })
    .as('AsynReactComponent');
```

**[⬆ back to top](#table-of-contents)**

## Resolving components

After you have registered your components, you can resolve components from the built container inside your DOM. You do this by setting 
the `data-component` attribute on a html element such as a `div`, `span` or `input` etc. 

```html
<div data-component="MyComponent"></div>
```

This will resolve and render a component that was registered `as()` 'MyComponent'. It's important to note that
this "target" type element by default will be replaced with what we refer to as a Habitat that houses your component.

However, `<input />`'s will always remain in the DOM so it's data is available on a form post (see [passing data back again](#passing-values-back-again)).

```html
<input type="hidden" data-component="EmployeeSelector" />
```

In addition to [prop attributes](#passing-properties-props-to-your-components), some Habitat options can also be configured with attributes.

|Attribute|Description|
|---|---|
|[data-habitat-class](#setting-the-habitats-css-class)|Set the Habitat's css class
|[data-habitat-no-replace](#replace-original-node)|Control the original node replacement behaviour

> **Note** options can also be configured [with a registration](#passing-options-to-register). 
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
|[data-r-prop-*](#data-r-prop-)|This [prefix](#prefix) in a reference to an object that exists on the global scope (window) to a prop.

> **Note** `proxy` is a reserved prop name. Read more about using the proxy in [passing data back again](#passing-values-back-again).

### Prefix

With an attribute *prefix* the **\*** may be replaced by any name. This allow's you to define the property name.
Property names must be all lower case and hyphens will be *automatically converted* to camel case.

For example

`data-prop-title` would expose `title` on the props object inside the component.

`data-prop-my-title` would expose `myTitle` on the props object inside the component.

### data-props

Set component props via an [encoded JSON](#use-encoded-json-in-html-attributes) string on the `data-props` attribute.

For example

```html
<div data-component="SomeReactComponent" data-props='{"title": "A nice title"}'></div>
```

### data-prop-*

Set an component prop via prefixing attributes with `data-prop-`.

For example

`data-prop-title` would expose `title` as a property inside the component.

Please note: *JSON*, *booleans* & *null* are automatically parsed. Eg `data-prop-my-bool="true"` would expose the value of `true`, NOT the string representation `"true"`.

Passing in an array of objects will require you to use html encoded characters for quotes etc i.e &quot;foo&quot; will replace "foo"

Simple Example

```html
<div data-component="SomeReactComponent"
    data-prop-title="A nice title"
    data-prop-show-title="true">
</div>
```

Would expose props as

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

JSON Example

```html
<div 
    data-component="SomeReactComponent"
    data-prop-person='{"name": "john", "age": 22}'>
</div>
```

Would expose as

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

Set an component prop with type [number] via prefixing attributes with `data-n-prop-`.

For example `data-n-prop-temperature="33.3"` would expose the float value of 33.3 and not the string representation '33.3'.

This is handy if you know that a property is always going to be a number or float.

### data-r-prop-*

Referenced a global variable in your component prop via prefixing attributes with `data-r-prop-`.

For Example

```html
<script>
    var foo = window.foo = 'bar';
</script>

<div data-component="SomeReactComponent" data-r-prop-foo="foo"></div>
```

This is handy if you need to share properties between habitats or you need to set JSON onto the page.

**[⬆ back to top](#table-of-contents)**

## Passing values back again

It can be handy to pass values back again, particularly for inputs so the backend frameworks can see any changes or read data.

*Every* React Habitat instance is passed in a prop named `proxy`, this is a reference the original dom element.
Please note only `<inputs />` are left in the DOM by default. To keep a generic element in the DOM, set the `data-habitat-no-replace="true"` attribute.

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

### Setting the habitat's css class

You can set a custom css class on the habitat element by setting the `data-habitat-class` attribute on the target element.
Alternatively you can use the [withOptions](#passing-options-to-register) method on the registration.

Example

`<div data-component="MyComponent" data-habitat-class="my-css-class"></div>`

Will result in the following being rendered

`<div data-habitat="C1" class="my-css-class">...</div>`

**[⬆ back to top](#table-of-contents)**

### Replace original node

By default only `<inputs />` are left in the DOM when a React Habitat is created.

To keep a generic element in the DOM, set the `data-habitat-no-replace="true"` attribute.

Alternatively you can use the [withOptions](#passing-options-to-register) method on the registration.

## Use encoded JSON in HTML attributes

When passing JSON to an attribute, you will need to encode the value so that content can be preserved and properly rendered.

As a general rule, escape the following characters with HTML entity encoding:

`&` --> `&amp;`  
`<` --> `&lt;`  
`>` --> `&gt;`  
`"` --> `&quot;`  
`'` --> `&#x27;`  
`/` --> `&#x2F;`

Example:

`<div data-props="{&quot;foo&quot;&colon; &quot;bar&quot;}"></div>`

Additionally, an encoder may replace [extended ASCII characters](https://en.wikipedia.org/wiki/Extended_ASCII) with the equivalent HTML entity encoding.

Most backend systems are capable of doing this automatically. An alternative is to use the [data-r-prop-*](#data-r-prop-) option.

**Single of Double Quotes?**

Double quotes around attributes values are the most common and our recommendation for setting properties with React Habitat.

However, there is a known hack of wrapping JSON attributes with single quotes and escaping nested single quotes.

example

`<div data-props='{"restaurant": "Bob\'s bar and grill"}'></div>`

*We will use this method in the docs to maintain readability. However, we strongly recommend you encode in production code.*

**[⬆ back to top](#table-of-contents)**


## Controlling Scope and Lifetime

- [Changing the habitat query selector](#changing-the-habitat-query-selector)
- [Dynamic updates](#dynamic-updates)
- [Update lifecycle](#update-lifecycle)
- [Start the dom watcher](#start-watcher)
- [Stop the dom watcher](#stop-watcher)
- [Disposing the container](#disposing-the-container)

**[⬆ back to top](#table-of-contents)**

### Changing the habitat query selector

*Default: 'data-component'*

By default React Habitat will resolve components via the `data-component` attribute. You can configure this by assigning
the `componentSelector` property in your constructor.

It will accept any string containing any valid attribute name.

Example

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
Alternatively, you can configure this to be evoked automatically by using a [watcher](#start-watcher).

Example

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    someMethod() {
        // This will scan the entire document body
        this.update();
    }
}
```
By default *update()* will scan the entire body, however a parent node can optionally be passed in for better
performance if you know where the update has occurred.

Example

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    someMethod() {    
        // Will scan just the children of the element with id 'content'
        this.update(window.document.getElementById('content'))
    }
}
```

You can call this method from somewhere else in your app by importing it

```javascript
import MyApp from './MyApp';

// ...

MyApp.update();
```

**[⬆ back to top](#table-of-contents)**

### Update Lifecycle

`ReactHabitat.Bootstrapper` has update "lifecycle methods" that you can override to run code at particular times
in the process. An update is the event that occurs when registrations are resolved.

|Method|Description
|---|---
|`shouldUpdate(node)`|Called when an update has been requested. Return false to cancel the update.
|`willUpdate(node)`|Called when an update is about to take place.
|`didUpdate(node)`|Called after an update has taken place.

Example

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    shouldUpdate(node) { 
        // Dont allow updates on div's
        if (node.tagName === 'div') {
            return false;
        }
    }
    
    willUpdate(node) {
        console.log('Im about to update', node);
    }
    
    didUpdate(node) {
        console.log('I just updated', node);
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Start Watcher

> **Note** IE 9 & 10 will require a [MutationObserver polyfill](https://github.com/megawac/MutationObserver.js/tree/master) 
to use this feature. An alternative is to call [update](#dynamic-updates) manually.

Start watching the DOM for any changes and wire up future components automatically (eg ajaxed HTML).

Example

```javascript
    this.setContainer(builder.build(), () => {
        // Wire up any future habitat elements automatically
        this.startWatcher();
    });
```

**[⬆ back to top](#table-of-contents)**

### Stop Watcher

Will stop watching the DOM for any changes.

Example

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    someMethod(){
        this.stopWatcher();
    }
}
```

**[⬆ back to top](#table-of-contents)**

### Disposing the container

To unload the container and remove all React Habitat instances. Call the `dispose()` method.

Example

```javascript
class MyApp extends ReactHabitat.Bootstrapper {
    constructor(){
        super();

        //...

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