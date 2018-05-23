# la-rado · [![Travis](https://img.shields.io/travis/flipactual/la-rado.svg?style=flat-square)](https://travis-ci.org/flipactual/la-rado/) [![Node](https://img.shields.io/node/v/la-rado.svg?style=flat-square)](http://npmjs.com/package/la-rado) [![NPM](https://img.shields.io/npm/v/la-rado.svg?style=flat-square)](http://npmjs.com/package/la-rado)

> State management... again

```js
// Setup initial state
const INITIAL_STATE = { on: false };
// Setup actions
const toggleOn = state => ({ ...state, on: !state.on });
// Setup store
const Store = new LaRado(INITIAL_STATE);
// Setup subscription
const subscriber = console.log;
Store.subscribe(subscriber);
// => { on: false }

// Perform an update
Store.update(toggleOn);
// => { on: true }
```
