module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": [
        "eslint:recommended"
    ],
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "jquery": true,
        "mocha": true,
        "es6": true
    },

    "rules": {
        // "react/prop-types": ["off"],
        "comma-dangle": ["error", "never"],
        "no-console": "warn",
        "operator-linebreak": "off",
        "eqeqeq": ["off"],
        "no-empty-function":"off",
        "no-useless-escape":"off",
        "no-unused-vars": ["error", { "vars": "local" }]
    }
};