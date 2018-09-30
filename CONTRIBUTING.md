# Contribute to React Habitat

Thank you for helping. Here are a few guidelines that will help you along the way.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. 
If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other 
people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take over it but you should 
still leave a comment.

## Branch Structure

All stable releases are to be tagged. At any given time, master represents the latest development version of the library. Patches or hotfix releases are prepared on an independent branch.

## Getting started

**Prerequisites**

- You have Node installed at v8+ and npm installed at v5+
- You understand git and github

## Development Workflow

After cloning this mono repo, run `npm install` to install the dependencies. Then run `npm run bootstrap` to install
the packages dependencies.

Then the following commands will 
become available.

- `npm run lint` checks code style.
- `npm run test` runs the test suite.
- `npm run test:w` runs the interactive test suite watcher for React Habitat package. Good for development.
- `npm run build` creates the complete lib and dist folders with packages.

To test your work against one of the example projects.

- Run a build (`npm run build`) so the example sites get your latest changes.
- `npm run start` will start the example site.
- `npm run start:es5` will start the es5 example site.
- `npm run start:ts` will start the Type Script example site.
- `npm run start:redux` will start the Redux example site.

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
