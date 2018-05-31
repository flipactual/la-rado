## How

### A Quick Example

If you're wondering how state management can be over-powered...

<!--emdaer-p
  - '@emdaer/plugin-image'
  - src: https://raw.githubusercontent.com/okaysoftware/iom/master/images/how.png?sanitize=true 
    alt: A Quick Example 
    align: center
-->

#### 1. Let's create a new store...

Import iom

```js
import Store from 'iom';
```

Describe the initial state... may as well save it somewhere, right?

```js
const INITIAL_STATE = { on: false };
```

Create the store by passing the initial state into the constructor

```js
const store = new Store(INITIAL_STATE);
```

Now you have a store

#### 2. And subscribe to the store...

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

#### 3. And update the state...

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

#### 4. And clean up

You can add and remove subscribers at any point

So let's cancel our subscription now that we're done

```js
cancel();
```
#### 5. [Then read the docs!](https://okaysoftware.github.io/iom/)

### Usage with React

<!--emdaer-p
  - '@emdaer/plugin-image'
  - src: https://raw.githubusercontent.com/okaysoftware/iom/master/images/react-store.png?sanitize=true
    alt: React contexts/store.js
    align: center
-->
```js
// src/contexts/store.js

import Store from "iom";
import { createContext } from "react";

export const INITIAL_STATE = { on: false };
export const store = new Store(INITIAL_STATE);

export const { Provider, Consumer } = createContext(INITIAL_STATE);

```

<!--emdaer-p
  - '@emdaer/plugin-image'
  - src: https://raw.githubusercontent.com/okaysoftware/iom/master/images/react-app.png?sanitize=true 
    alt: React App.js
    align: center
-->

```js
// src/App.js

import React, { Component } from "react";

import { store, INITIAL_STATE, Provider } from "./contexts/store";
import Switch from "./components/Switch.js";

class App extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }
  componentDidMount() {
    store.subscribe(state => this.setState(state));
  }
  render() {
    return (
      <Provider value={this.state}>
        <Switch />
      </Provider>
    );
  }
}

export default App;
```

<!--emdaer-p
  - '@emdaer/plugin-image'
  - src: https://raw.githubusercontent.com/okaysoftware/iom/master/images/react-switch.png?sanitize=true
    alt: React components/Switch.js
    align: center
-->

```js
// src/components/Switch.js

import React, { Component, Fragment } from "react";

import { store, Consumer } from "../contexts/store";

class Switch extends Component {
  toggleOn() {
    store.update(state => ({ ...state, on: !state.on }));
  }
  render() {
    return (
      <Fragment>
        <Consumer>{({ on }) => (on ? "🙂" : "🙃")}</Consumer>
        <button onClick={this.toggleOn}>Toggle</button>
      </Fragment>
    );
  }
}

export default Switch;
```

### Purity and Stack Safety

Purity and stack safety are up to you 

#### Purity

If you're using a mutable data structure for your state, be mindful and don't mutate it

#### Stack Safety

Don't call actions from within subscribers or other actions or you are very likely to encounter infinite loops
