# Contribute to React Habitat

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. 
If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other 
people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should 
still leave a comment.

## Getting started

**Prerequisites**

- You have Node installed at v8+ and npm installed at v5+
- You understand git and github

## Development Workflow

After cloning React Habitat, run `npm install` to install the dependencies. Then the following commands will 
become available.

- `npm run lint` checks code style.
- `npm run test` runs the test suite.
- `npm run test:w` runs the interactive test suite watcher. Good for development.
- `npm run build` creates the complete lib and dist folders with packages.
- `npm run build:lib` creates just the lib folder with packages.
- `npm run build:umd` creates just the dist folder with the packages.
- `npm run build:umd:min` creates just the dist folder with the minified packages.

To test your work against an existing project. Use npm [link](https://docs.npmjs.com/cli/link)

- Run a build (`npm run build`).
- `npm link` in React Habitat's root directory.
- `npm link react-habitat` in your existing project directory.

Remember to use `npm unlink react-habitat` to return it to normal.

## Submitting Pull Requests

The core maintainers monitor pull request's whom will perform the reviews.

**Before submitting a pull request** please ensure the following is done:

- Fork the repository and create your branch from `develop`.
- If you've fixed a bug or added a feature, add tests.
- Ensure the tests pass (`npm run test`).
- Make sure your code lints (`npm run lint`).
