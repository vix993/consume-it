module.exports = {
    presets: [
        "@babel/preset-typescript",
    //     "@babel/preset-env",
    ],
    plugins: [
        ["@babel/transform-react-jsx", {
            "runtime": "automatic"
        }],
        // ["@babel/transform-runtime"]
    ]
}