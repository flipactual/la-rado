module.exports = {
  parser: 'babel-eslint',
  env: { 'jest/globals': true },
  plugins: ['jest', 'prettier', 'flowtype'],
  extends: ['airbnb-base', 'prettier', 'prettier/flowtype'],
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
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true }],
  },
};
