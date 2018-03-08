## React Habitat Change log

### [UNPUBLISHED]

-

### [1.0.1]

- Typo fixes in Readme. Thanks @ryanpcmcquen 

### [1.0.0]

**Breaking Change:** `registerAsync` now expects a function. Please see [migration guide](https://github.com/DeloitteDigitalAPAC/react-habitat/wiki/v0.5---v1.0-Migration-Guide).

- Fixed missing dependencies in Code Splitting Example. Thanks @ryanpcmcquen
- Fixed lazy loading [#28](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/28). Thanks @ryanpcmcquen
- Cleanup: removed old deprecated method 'register' from container
- Cleanup: removed old deprecated method 'registerAll' from container
- Cleanup: removed old deprecated method 'registerComponent' from container
- Cleanup: removed old deprecated method 'registerComponents' from container
- Cleanup: removed old deprecated method 'getComponent' from container
- Cleanup: removed old deprecated method 'domFactory' from container

### [0.6.1]

- Updated docs for Typescript imports. Thanks @samuelalvin

### [0.6.0]

- Added "unmountHabitats" method and lifecycle hooks. Thanks @finnfiddle

### [0.5.1]

- Updated support for React and React DOM v16. Thanks @nilsml
- Moved react and react dom into peerDependencies

### [0.5.0]

- Updated npm packages in examples
- Code Splitting Support and Dynamic imports [#2](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/2)
- Updated readme with JSON encoding information [#11](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/11). Thanks @joshuakelly
- Added new container builder
- Register components with default props and options
- Added update lifecycle methods
- Added dynamic html wire up support [#12](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/12)
- Added Redux example
- Added TypeScript example
- Updated examples to use latest webpack
- Deprecated elements property from Bootstrapper
- Small optimisation wins for production builds

### [0.4.2]

- Updated readme with TypeScript notes
- Fixed issues with type script definitions [#9](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/9). Thanks @aventurella

### [0.4.1]

- Fixed typo in readme. Thanks @WPprodigy

### [0.4.0]

- React Habitat Components can now have children [#5](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/5). Thanks @6stringbeliever

### [0.3.1]

- Updated docs

### [0.3.0]

- Added 'data-n-prop' to parse in number type properties
- Added 'data-r-prop' to parse in reference type properties
- 'null' values will now parse in as a null object
- Added safe logging
- Warnings and Errors now only apply when NODE_ENV is not 'production'
- Updated warning messages & added more details links
- Non empty React Habitat component elements now log's a warning instead of throwing errors
- Fixed issue with parsing empty object's and array's as strings. [#3](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/3)
- Updated framework module exports so commonJS no longer needs ugly '.default' [#4](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/4)
- Added examples

### [0.2.1]

- Deprecated 'registerComponent' should now use 'register'
- Deprecated 'registerComponents' should now use 'registerAll'
