# Usage with React

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
