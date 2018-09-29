const path = require('path');

module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [path.resolve('./src')]
      }
    }
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
  },
  "rules": {
    "strict": 0,
    "no-console": 0,
    "global-require": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/iframe-has-title": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-redundant-roles": 0,
    "prefer-destructuring": "warn",
    'max-len': ["error", 120],
    "react/sort-comp": [1, {
      order: [
        'static-methods',
        'instance-variables',
        'lifecycle',
        'everything-else',
        'render',
      ]
    }],
    'object-curly-newline': 0,
  },
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "DEBUG": true,
    "THEME": true,
  }
};
