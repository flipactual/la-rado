const STATE = Symbol('STATE');
const SUBSCRIBERS = Symbol('SUBSCRIBERS');

/**
 * Create a store
 *
 * The initial state likely should describe the full intended shape of the 
 * store
 *
 * @param {*} state - The initial state
 * @example
 * const INITIAL_STATE = { on: false };
 * const Store = new LaRado(INITIAL_STATE);
 */
class LaRado {
  /**
   * Create a store
   */
  constructor(state = {}) {
    this[STATE] = state;
    this[SUBSCRIBERS] = [];
  }
  /**
   * Add a subscriber to the store
   *
   * Subscribers are called with the current state A. when they are first
   * passed to the subscribe method and B. whenever an action is executed on the
   * store via the update method
   * 
   * @param {Subscriber} subscriber - The subscriber to add
   * @returns {Function} - A function which cancels the subscription when called 
   * @example
   * const subscriber = console.log;
   * const cancel = Store.subscribe(subscriber);
   * // do some things
   * cancel();
   */
  subscribe(subscriber) {
    this[SUBSCRIBERS] = [...this[SUBSCRIBERS], subscriber];
    subscriber(this[STATE]);
    return () => {
      this[SUBSCRIBERS] = this[SUBSCRIBERS].filter(fn => fn !== subscriber);
    };
  }
  /**
   * Perform an action on the state and update all subscribers with the
   * new state
   *
   * Actions passed to the update method are called with the current state and
   * return the new state
   * 
   * @param {Action} action - The action to take on the state
   * @example
   * const toggleOn = state => ({ ...state, on: !state.on });
   * Store.update(toggleOn);
   */
  update(action) {
    this[STATE] = action(this[STATE]);
    this[SUBSCRIBERS].forEach(subscriber => subscriber(this[STATE]));
  }
}

module.exports = LaRado;

/** 
 * @name Subscriber
 * @function
 * @param {*} state - The updated state
 * @see LaRado#subscribe
 */

/** 
 * @name Action 
 * @function
 * @param {*} state - The current state
 * @see LaRado#update
 */
