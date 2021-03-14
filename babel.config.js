module.exports = {
    presets: [
        "@babel/preset-typescript",
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ],
        ["transform-react-jsx", { "pragma": "h"}]
    ]
}