## React Habitat Change log

### [0.5.0]

- Updated packages in examples
- Updated readme with JSON encoding information [#11](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/11). Thanks @joshuakelly
- Deprecated elements property from Bootstrapper
- Added dynamic html wire up support [#12](https://github.com/DeloitteDigitalAPAC/react-habitat/issues/12)
- Small optimisation wins for production builds
- Removed all deprecated methods

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
