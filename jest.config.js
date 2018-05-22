module.exports = {
  collectCoverage: true,
  verbose: true,
  testMatch: ['<rootDir>/**/*.test.js'],
  transform: {
    '\\.js$': 'jest-flow-transform',
  },
};
