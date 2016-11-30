![Deloitte Digital](https://raw.githubusercontent.com/DeloitteDigital/DDBreakpoints/master/docs/deloittedigital-logo-white.png)

# React Habitat ![Build Status](https://travis-ci.org/DeloitteDigitalAPAC/react-habitat.svg?branch=master)

## React Habitat <3 Your CMS

React Habitat is designed for integrating React with your CMS using the DOM as the interface. It's based of some basic
[container programming principles](https://en.wikipedia.org/wiki/Container_(abstract_data_type)) and brings peace and order to multi page apps.

This framework exists so you can get on with the fun stuff!

## Table of contents

- [When to use React Habitat](#when-to-use-react-habitat)
- [When not to use it](#when-not-to-use-it)
- [Features](#features)
- [Compatibility](#compatibility)
- [Installing](#installing)
- [Getting Started](#getting-started)
- [Passing props/properties to your components](#passing-properties-props-to-your-components)
- [Passing data back again](#passing-values-back-again)
- [Options and Methods](#options-and-methods)
- [Contribute](#want-to-contribute)
- [License information](#license-bsd-3-clause)
- [Examples](https://github.com/DeloitteDigitalAPAC/react-habitat/tree/master/examples)
- [Change log](https://github.com/DeloitteDigitalAPAC/react-habitat/blob/master/CHANGELOG.md)


## When to use React Habitat

You should use React Habitat any time there is a framework or CMS rendering your HTML and you want one or multiple
[React components](https://facebook.github.io/react/docs/component-api.html) on the page(s).
For example sometimes there are only sections of your page that you want to be a React Component, then this framework is perfect for that.

The idea behind this is that, rather than trying to initiate one or many React components; by either hard coding or using a Router. You switch it around so components "new up" themselves when required.

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

Typically if you're building a full-on one page React app that yanks data from restful API's... then this framework isn't really going to bring much benefit to you. However you are definitely invited to use it if you want to.

## Features

- Tiny code footprint (only 8KB)
- **Redux** supported by including [react-habitat-redux](https://github.com/DeloitteDigitalAPAC/react-habitat-redux)
- Pass data (props) to your components directly from HTML attributes and back again
- Automatic data/JSON parsing
- All page child apps can still share the same components, stores, events etc. (Everything is connected)
- Simple to swap out components for others (The beauty of IOC containers)
- For advanced users, you can use different components for different build environments
- 100% W3C HTML5 Valid
- TypeScript definitions included

## Compatibility

- Supports Browsers IE9+ and all the evergreens. (IE9-11 will require an "Object.assign" [Pollyfill](https://babeljs.io/docs/usage/polyfill/))
- ES5, ES6/7 & TypeScript
- React v15 and up

We highly recommend you use something like [WebPack](https://webpack.github.io/) or [Browserify](http://browserify.org/) when using this framework.

## Installing

Install with Node Package Manager (NPM)

`npm install --save-dev react-habitat`

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/).

If you don’t yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactHabitat` available as a global object, you can grab a pre-built version from the dist folder.

## Getting Started

**Using ES6 or 7?** Read the [ES6 version here](readme.md#getting-started).

The basic pattern for integrating React Habitat into your application is:

- Structure your app with inversion of control (IoC) in mind.
- At application startup...
- Create a Container.
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

In React Habitat, you'd register a component something like this

```javascript
{	register: 'SomeReactComponent', for: SomeReactComponent }
```

So for our sample application we need to register all of our components (classes) to be exposed to the DOM so things get wired up nicely.

```javascript
var ReactHabitat = require('react-habitat');
var SomeReactComponent = require('./SomeReactComponent');
var AnotherReactComponent = require('./AnotherReactComponent');

function MyApp() {

  // Create a new react habitat bootstrapper
  this.domContainer = ReactHabitat.createBootstrapper({

    // Create a new container
    container: [

      // Register your top level component(s)
      {register: 'SomeReactComponent', for: SomeReactComponent},
      {register: 'AnotherReactComponent', for: AnotherReactComponent}
    ]
  });

}

// Always export a 'new' instance so it immediately evokes
exports.MyApp = new MyApp();
```

**If you are using Redux**

You will need to use a different container. Please install & configure the [react-habitat-redux library](https://github.com/DeloitteDigitalAPAC/react-habitat-redux). Then continue with step 2 below.


#### 2. Application execution - render your components

During the web application execution you will want to make use of the components you registered. You do this by *resolving* them in the DOM from a scope.

When you resolve a component, a new instance of the object gets created (Resolving a component is roughly equivalent to calling 'new').

To *resolve* new instances of your components you need to attach a `data-component` attribute to a `div` or a `span` element in the HTML. These elements should always
remain empty. Any child components should be nested inside the React components themselves.

Set the `data-component` value to equal a component name you have registered in the container.

For instance:

```html
<div data-component="SomeReactComponent"></div>
```

Will be resolved by the following registration.

```javascript
{register: 'SomeReactComponent', for: SomeReactComponent}
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

**Note** It's important that the output built javascript file is included at the end of the DOM just before the closing </body> tag.


### Passing properties *(props)* to your components

Resolving and registering components alone is not all that special, but passing data to it via html attributes is pretty useful. This allows the backend to
easily pass data to your components in a modular fashion.

To set props you have a few choices. You can use all of these or only some (they merge) so just use what's suits you best for setting properties.

- [data-props](#data-props) Maps JSON to props.
- [data-prop-](#data-prop-) (Prefix) Maps in strings, booleans, null, array or JSON to a prop.
- [data-n-prop-](#data-n-prop-) (Prefix) Maps in numbers and floats to a prop.
- [data-r-prop-](#data-r-prop-) (Prefix) Maps in a reference to an object that exists on the global scope (window) to a prop.

**PLEASE NOTE:** 
The last three options are attribute *prefixes*. This allow's you to define the property the name. 
Property names will be *automatically converted* from hyphens to camel case.

For example

`data-prop-title` would expose `title` on the props object inside the component.

`data-prop-my-title` would expose `myTitle` on the props object inside the component.


#### data-props 

Set component props via a JSON string on the `data-props` attribute.

For example

```html
<div data-component="SomeReactComponent" data-props='{"title": "A nice title"}'></div>
```

#### data-prop- 

Set an component prop via prefixing attributes with `data-prop-`.

For example

`data-prop-title` would expose `title` as a property inside the component.

Please note: *JSON*, *booleans* & *null* are automatically parsed. Eg `data-prop-my-bool="true"` would expose the value of `true`, NOT the string representation `"true"`.

Simple Example

```html
<div data-component="SomeReactComponent"
    data-prop-title="A nice title"
    data-prop-show-title="true">
</div>
```

Would expose props as

```javascript
var SomeReactComponent = React.createClass({
	render: function() {

		this.props.title === "A nice title";      //> true
		this.props.showTitle === true;            //> true

		return <div>{ this.props.showTitle ? this.props.title : null }</div>;
	}
});
```

JSON Example

```html
<div data-component="SomeReactComponent"
		data-prop-person="{'name': 'john', 'age': 22}">
</div>
```

Would expose as

```javascript
var SomeReactComponent = React.createClass({
	render: function() {

		return (
			<div>
				Name: {this.props.person.name}
				Age: {this.props.person.age}
			</div>
		);
  }
});
```


#### data-n-prop-

Set an component prop with type [number] via prefixing attributes with `data-n-prop-`.

For example `data-n-prop-temperature="33.3"` would expose the float value of 33.3 and not the string representation '33.3'.

This is handy if you know that a property is always going to be a number or float.

#### data-r-prop-

Referenced a global variable in your component prop via prefixing attributes with `data-r-prop-`.

For Example

```html
<script>
    var foo = window.foo = 'bar';
</script>

<div data-component="SomeReactComponent" data-r-prop-foo="foo"></div>
```
 
This is handy if you need to share properties between habitats or you need to set JSON onto the page.

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

## Options & Methods

### Setting the habitat's css class

You can set a custom css class on the habitat element by setting the `data-habitat-class` attribute on the target element.

Example

`<div data-component="MyComponent" data-habitat-class="my-css-class"></div>`

Will result in the following being rendered

`<div data-habitat="C1" class="my-css-class">...</div>`

### Replace original node

By default only `<inputs />` are left in the DOM when a React Habitat is created. 

To keep a generic element in the DOM, set the `data-habitat-no-replace="true"` attribute.

### Changing the habitat query selector

*Default: 'data-component'*

By default React Habitat will resolve components via the `data-component` attribute. You can configure this by assigning
the `componentSelector` property.

It will accept any string containing any valid attribute name.

Example

```javascript
function MyApp() {

	// Create a new react habitat bootstrapper
	this.domContainer = ReactHabitat.createBootstrapper({
		componentSelector: 'myComponents'
	});

}
```

### Disposing the container

To unload the container and remove all React Habitat instances. Call the `dispose()` method.

Example

```javascript
function MyApp() {

	// Create a new react habitat bootstrapper
	this.domContainer = ReactHabitat.createBootstrapper({
		...
	});

	this.domContainer.dispose();

}
```

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
