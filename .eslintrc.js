module.exports = {
  parser: 'babel-eslint',
  env: { node: true, 'jest/globals': true },
  plugins: ['jest', 'prettier', 'flowtype'],
  extends: ['problems', 'plugin:prettier/recommended'],
  rules: {
    'require-jsdoc': [
      2,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
  },
};
