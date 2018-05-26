## How

If you're wondering how state management can be over-powered...

### 1. Let's create a new store...

Import iom

```js
const Store = require('iom');
```

Describe the initial state... may as well save it somewhere, right?

```js
const INITIAL_STATE = Object.freeze({ on: false });
```

Create the store by passing the initial state into the constructor

```js
const store = new Store(INITIAL_STATE);
```

Now you have a store

### 2. And subscribe to the store...

We'll just send state updates to the console for now

```js
const subscriber = console.log;
```

Passing a subscriber to the store returns a function which cancels the subscription... let's hang onto that

```js
const cancel = store.subscribe(subscriber);
// => { on: false }
```

All subscribers receive the current state when added to the store

### 3. And update the state...

This is where iom likely diverges from state managers you've used before

You may notice that we haven't talked at all about updating state yet

That's because you can update state in anyway that you like at any point because actions are simply functions passed to the store which take the current state as their argument and return the new state

So let's create an action

```js
const toggleOn = state => ({ ...state, on: !state.on });
```

And perform an update

```js
store.update(toggleOn);
// => { on: true }
```

And that's iom!

### 4. And clean up

You can add and remove subscribers at any point

So let's cancel our subscription now that we're done

```js
cancel();
```

### 5. [Then read the docs!](https://okaysoftware.github.io/iom/)
