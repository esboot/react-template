const userConfig = require('./esboot.config');

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": userConfig.browsers
        },
        "modules": false,
        "useBuiltIns": "usage"
      }
    ],
    "@babel/react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    [
      "react-css-modules",
      {
        "filetypes": {
          ".scss": {
            "syntax": "postcss-scss"
          }
        },
        "generateScopedName": "[name]__[local]___[hash:base64:5]",
        "webpackHotModuleReloading": true,
        "handleMissingStyleName": "warn"
      }
    ]
  ],
  "env": {
    "production": {
      "plugins": ["transform-react-remove-prop-types"]
    }
  }
};