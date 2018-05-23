const crypto = require('crypto');
const Future = require('fluture');

const LaRado = require('.');

describe('LaRado', () => {
  it('dispatches after actions', () => {
    expect.assertions(4);
    // Setup initial state
    const INITIAL_STATE = { on: false };
    // Setup actions
    const toggleOn = state => ({ ...state, on: !state.on });
    // Setup store
    const Store = new LaRado(INITIAL_STATE);
    // Setup subscription
    const subscriber = jest.fn();
    Store.subscribe(subscriber);

    // Confirm that subscriber is called when added
    expect(subscriber).toHaveBeenLastCalledWith({ on: false });

    // Perform an update
    Store.update(toggleOn);
    expect(subscriber).toHaveBeenLastCalledWith({ on: true });

    // Toggle it a few times to be sure
    Store.update(toggleOn);
    expect(subscriber).toHaveBeenLastCalledWith({ on: false });
    Store.update(toggleOn);
    expect(subscriber).toHaveBeenLastCalledWith({ on: true });
  });
  it('has cancelable subscribers', () => {
    expect.assertions(5);
    // Setup initial state
    const INITIAL_STATE = { on: false };
    // Setup actions
    const toggleOn = state => ({ ...state, on: !state.on });
    // Setup store
    const Store = new LaRado(INITIAL_STATE);
    // Setup subscription
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const subscriber3 = jest.fn();
    Store.subscribe(subscriber1);
    const cancel = Store.subscribe(subscriber2);
    Store.subscribe(subscriber3);

    // Confirm that subscriber is called when added
    expect(subscriber2).toHaveBeenLastCalledWith({ on: false });

    // Perform an update
    Store.update(toggleOn);
    expect(subscriber2).toHaveBeenLastCalledWith({ on: true });

    // Unsubscribe
    cancel();

    // Perform another update
    Store.update(toggleOn);
    expect(subscriber1).toHaveBeenLastCalledWith({ on: false });
    expect(subscriber2).toHaveBeenLastCalledWith({ on: true });
    expect(subscriber3).toHaveBeenLastCalledWith({ on: false });
  });
  it('handles many asynchronous updates', testDone => {
    expect.assertions(2);
    const UPDATE_COUNT = 1e3;
    // Setup properties
    const properties = Array(...Array(UPDATE_COUNT)).map(() =>
      crypto.randomBytes(20).toString('hex')
    );
    // Setup initial state
    const INITIAL_STATE = properties.reduce(
      (acc, val) => ({ ...acc, [val]: false }),
      {}
    );
    // Setup actions
    const actions = properties.map(val => state => ({ ...state, [val]: true }));
    // Setup store
    const Store = new LaRado(INITIAL_STATE);
    // Setup subscription
    const subscriber = jest.fn();
    Store.subscribe(subscriber);

    // Perform many updates
    Future.parallel(
      UPDATE_COUNT,
      actions.map(action =>
        Future.node(done =>
          setTimeout(() => {
            Store.update(action);
            done();
          }, Math.floor(Math.random() * Math.floor(10)))
        )
      )
    ).fork(jest.fn(), () => {
      // Confirm that subscriber is called when added
      expect(subscriber).toHaveBeenCalledTimes(UPDATE_COUNT + 1);
      expect(subscriber).toHaveBeenLastCalledWith(
        properties.reduce((acc, val) => ({ ...acc, [val]: true }), {})
      );
      testDone();
    });
  });
});
