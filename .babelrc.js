module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
        shippedProposals: true,
      },
    ],
    '@babel/preset-flow',
    'babel-preset-minify',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  },
  ignore: ['../**/*.test.js'],
};
