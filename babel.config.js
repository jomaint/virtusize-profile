module.exports = {
    "presets": [
        "@babel/preset-env", 
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-optional-chaining",
        "react-hot-loader/babel"
    ]
};
