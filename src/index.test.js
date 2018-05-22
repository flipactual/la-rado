const crypto = require('crypto');

const LaRado = require('.');

describe('LaRado', () => {
  it('dispatches after actions', () => {
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

    // Toggle it a few times to be sure
    expect(subscriber).toHaveBeenLastCalledWith({ on: true });
    Store.update(toggleOn);
    expect(subscriber).toHaveBeenLastCalledWith({ on: false });
    Store.update(toggleOn);
    expect(subscriber).toHaveBeenLastCalledWith({ on: true });
  });
  it('handles many asynchronous updates', async () => {
    // Setup properties
    const properties = Array(...Array(1e3)).map(() =>
      crypto.randomBytes(1e1).toString('hex')
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
    await Promise.all(
      actions.map(
        async action =>
          new Promise(resolve =>
            setTimeout(() => {
              Store.update(action);
              resolve();
            }, Math.floor(Math.random() * Math.floor(10)))
          )
      )
    );

    // Confirm that subscriber is called when added
    expect(subscriber).toHaveBeenLastCalledWith(
      properties.reduce((acc, val) => ({ ...acc, [val]: true }), {})
    );
  });
});
