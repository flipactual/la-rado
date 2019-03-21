module.exports = {
  parser: 'babel-eslint',
  env: { node: true, 'jest/globals': true },
  plugins: ['jest', 'react', 'prettier', 'flowtype'],
  extends: ['problems', 'plugin:react/recommended', 'plugin:prettier/recommended'],
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
