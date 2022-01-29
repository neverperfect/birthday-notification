module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": 0,
        'max-len': 'off',
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    }
};
