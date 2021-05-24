const path = require("path");
const Dotenv = require("dotenv-webpack");
module.exports={
    entry:"/scripts/main.js",
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: "svg-loader"
            },
            {
                test:/\.css$/,
                use:["style-loader, css-loader"]
            },
            {
                test:/\.js$/,
                use: "babel-loader"
            }
        ]
    },
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    plugins: [new Dotenv()],
    mode:"development",
}