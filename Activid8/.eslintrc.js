module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "plugin:react/recommended", //"eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "classes": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ]
    }
};
