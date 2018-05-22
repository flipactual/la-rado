const STATE = Symbol('STATE');
const SUBSCRIBERS = Symbol('SUBSCRIBERS');

/** 
 * @name Subscriber
 * @function
 * @param {Object} state - The updated state
 */

/** 
 * @name Action 
 * @function
 * @param {Object} state - The current state
 */

/** Class representing a store */
class LaRado {
  /**
   * Create a store
   * @param {object} state - The initial state
   */
  constructor(state = {}) {
    this[STATE] = state;
    this[SUBSCRIBERS] = [];
  }
  /**
   * Add a subscriber to the store
   * @param {Subscriber} subscriber - The subscriber to add
   */
  subscribe(subscriber) {
    this[SUBSCRIBERS] = [...this[SUBSCRIBERS], subscriber];
  }
  /**
   * Updates all subscribers with the new state
   * @param {Action} action - The action to take on the state
   */
  update(action) {
    this[STATE] = action(this[STATE]);
    this[SUBSCRIBERS].forEach(subscriber => subscriber(this[STATE]));
  }
}

module.exports = LaRado;
