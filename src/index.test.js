const unicornGetter = require('.');

describe('unicornGetter', () => {
  it('gets a unicorn', () => {
    expect(unicornGetter()).toEqual('🦄');
  });
});
