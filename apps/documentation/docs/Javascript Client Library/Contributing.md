---
sidebar_label: Contributing
sidebar_position: 6
---

# Local development setup

```sh
$ npm install -g
$ npm run dev
```

and then

```javascript
import Video from 'amplify-video.js/dist';
```

\*`npm run dev` will watch for changes in your file compile your project based on `tsconfig.json` file

## Tests

Unit-tests are located in `unit-tests/` directory, all unit-tests must go here.

End-to-end tests are located in `e2e/` directory, it contains a React Application and Cypress allowing us to test real use cases with the library simulating user interaction in a browser.

You can run unit-tests and end-to-end tests independently

### Unit-tests only

```sh
$ npm run unit-test
```

If you want to watch changes in your files you can pass --watch to previous command.

```sh
$ npm run unit-test -- --watch
```

### End-to-end tests only (no GUI)

```sh
$ npm run cypress
```

### Both (unit & end-to-end tests)

```sh
$ npm test
```

For more information about end-to-end testing check [End-to-End testing section](End-to-End.md#end-to-end-testing "e2e's README.md").