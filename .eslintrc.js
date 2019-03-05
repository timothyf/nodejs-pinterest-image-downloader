module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'semi-spacing': [
      'error',
      {'before': false, 'after': true}
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'no-console': [
      'error',
      {'allow': ['info', 'debug', 'error']}
    ]
  }
};
