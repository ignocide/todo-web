module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'object-curly-newline': 0,
    'func-names': 0,
    "indent": ["error", 2]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
