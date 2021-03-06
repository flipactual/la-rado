/* eslint-disable require-jsdoc */

const crypto = require("crypto");
const React = require("react");
const { Component, Fragment, createContext } = React;
import { render, fireEvent } from "react-testing-library";

const Store = require(".");

describe("iom", () => {
  describe("base", () => {
    it("dispatches after actions", () => {
      expect.assertions(4);
      // Setup initial state
      const INITIAL_STATE = { on: false };
      // Setup actions
      const toggleOn = state => ({ ...state, on: !state.on });
      // Setup store
      const store = new Store(INITIAL_STATE);
      // Setup subscription
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      // Confirm that subscriber is called when added
      expect(subscriber).toHaveBeenLastCalledWith({ on: false });

      // Perform an update
      store.update(toggleOn);
      expect(subscriber).toHaveBeenLastCalledWith({ on: true });

      // Toggle it a few times to be sure
      store.update(toggleOn);
      expect(subscriber).toHaveBeenLastCalledWith({ on: false });
      store.update(toggleOn);
      expect(subscriber).toHaveBeenLastCalledWith({ on: true });
    });
    it("has cancelable subscribers", () => {
      expect.assertions(5);
      // Setup initial state
      const INITIAL_STATE = { on: false };
      // Setup actions
      const toggleOn = state => ({ ...state, on: !state.on });
      // Setup store
      const store = new Store(INITIAL_STATE);
      // Setup subscription
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();
      const subscriber3 = jest.fn();
      store.subscribe(subscriber1);
      const cancel = store.subscribe(subscriber2);
      store.subscribe(subscriber3);

      // Confirm that subscriber is called when added
      expect(subscriber2).toHaveBeenLastCalledWith({ on: false });

      // Perform an update
      store.update(toggleOn);
      expect(subscriber2).toHaveBeenLastCalledWith({ on: true });

      // Unsubscribe
      cancel();

      // Perform another update
      store.update(toggleOn);
      expect(subscriber1).toHaveBeenLastCalledWith({ on: false });
      expect(subscriber2).toHaveBeenLastCalledWith({ on: true });
      expect(subscriber3).toHaveBeenLastCalledWith({ on: false });
    });
    it("handles many asynchronous updates", testDone => {
      expect.assertions(2);
      const UPDATE_COUNT = 1e3;
      // Setup properties
      const properties = [...Array(UPDATE_COUNT)].map(() =>
        crypto.randomBytes(20).toString("hex")
      );
      // Setup initial state
      const INITIAL_STATE = properties.reduce(
        (acc, val) => ({ ...acc, [val]: false }),
        {}
      );
      // Setup actions
      const actions = properties.map(val => state => ({
        ...state,
        [val]: true
      }));
      // Setup store
      const store = new Store(INITIAL_STATE);
      // Setup subscription
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      // Perform many updates
      Promise.all(
        actions.map(
          action =>
            new Promise(resolve =>
              setTimeout(() => {
                store.update(action);
                resolve();
              }, Math.floor(Math.random() * Math.floor(10)))
            )
        )
      ).then(() => {
        // Confirm that subscriber is called when added
        expect(subscriber).toHaveBeenCalledTimes(UPDATE_COUNT + 1);
        expect(subscriber).toHaveBeenLastCalledWith(
          properties.reduce((acc, val) => ({ ...acc, [val]: true }), {})
        );
        testDone();
      });
    });
  });
  describe("w/ React", () => {
    it("works with React", () => {
      const INITIAL_STATE = { on: false };
      const store = new Store(INITIAL_STATE);
      const { Provider, Consumer } = createContext(INITIAL_STATE);
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
      const { container, getByText } = render(<App />);

      expect(container).toMatchInlineSnapshot(`
<div>
  🙃
  <button>
    Toggle
  </button>
</div>
`);
      fireEvent.click(getByText(/Toggle/));
      expect(container).toMatchInlineSnapshot(`
<div>
  🙂
  <button>
    Toggle
  </button>
</div>
`);
      fireEvent.click(getByText(/Toggle/));
      expect(container).toMatchInlineSnapshot(`
<div>
  🙃
  <button>
    Toggle
  </button>
</div>
`);
    });
  });
});
