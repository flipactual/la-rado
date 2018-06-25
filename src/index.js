/* @flow */

type State = *;

type Subscriber = State => any;

type Action = State => State;

/**
 * Create a store
 *
 * The initial state likely should describe the full intended shape of the 
 * store
 *
 * @example
 * const INITIAL_STATE = { on: false };
 * const store = new Store(INITIAL_STATE);
 */
class Store {
  state: State;
  subscribers: Set<Subscriber>;
  /**
   * Create a store
   */
  constructor(state: State) {
    this.state = state;
    this.subscribers = new Set();
  }
  /**
   * Add a subscriber to the store
   *
   * Subscribers are called with the current state A. when they are first
   * passed to the subscribe method and B. whenever an action is executed on the
   * store via the update method
   * 
   * @returns {Function} - A function that cancels the subscription when called 
   * @example
   * const subscriber = console.log;
   * const cancel = store.subscribe(subscriber);
   * // do some things
   * cancel();
   */
  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    subscriber(this.state);
    return () => this.subscribers.delete(subscriber);
  }
  /**
   * Perform an action on the state and update all subscribers with the
   * new state
   *
   * Actions passed to the update method are called with the current state and
   * return the new state
   * 
   * @example
   * const toggleOn = state => ({ ...state, on: !state.on });
   * store.update(toggleOn);
   */
  update(action: Action) {
    this.state = action(this.state);
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }
}

module.exports = Store;
