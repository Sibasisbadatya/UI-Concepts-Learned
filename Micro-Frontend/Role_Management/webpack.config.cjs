
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { use } = require('react');
const port = 3000;
module.exports = {
    mode: "development",
    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[contenthash].js"
        // Reason (short explanation):
        //     You enabled splitChunks: { chunks: "all" }, so Webpack creates multiple chunks (e.g., main, vendors).
        //     Your output filename is fixed as main.js.
        //     All chunks try to write to the same file (main.js).
        //     Webpack cannot overwrite the same file for different chunks.
        //     So it throws the error:
        //     output: 
        //       filename: "[name].[contenthashjs"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    // This tells Webpack:
    // How to locate files when importing modules.
    //     Without this config, Webpack only checks:
    //     .js
    //     .json
    //     .wasm
    module: {
        // module is a Webpack configuration section that defines how different file types should be processed.
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
                // css-loader
                //     Reads CSS files and converts them into JavaScript modules and inject into main.js
                // style-loader
                //     Injects the CSS into the browser DOM using <style> tags.
            },
            // css-loader
            // Reads CSS files and converts them into JavaScript modules.

            // style-loader
            // Injects the CSS into the browser DOM using <style> tags.


            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: "asset/resource"
            // }
            // This test we are not using now but do undersatand

            // type: "asset/resource"

            // Webpack only understands JavaScript and JSON by default.
            // If you try:
            // import logo from "./logo.png";
            // Module parse failed: Unexpected character

            // type: "asset/resource" ,This tells Webpack:
            // Copy the image into the output folder
            // Return the URL of the file
            // Example
            // import logo from "./logo.png";
            // Webpack outputs:
            // dist/
            // logo.a72h3.png
            // and the variable becomes:
            // /dist/logo.a72h3.png
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, //i means case insensitive
                use:{
                    loader:'file-loader',//does 2 things 1.copies the image into build output folder and 2.returns the URL.
                    options:{
                        name:'[name].[hash].[ext]', //contentHash hash based on filecontent
                        outputPath:'images'
                    }
                }
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader' //processes HTML content and assets(heer it may use file-loader internally) inside HTML 
                    }
                ]
            }
        ]
    },
    plugins: [
        // Each plugin is created using: new PluginName()
        new CleanWebpackPlugin(), //It deletes old files in the output folder (dist) before every build.
        new HtmlWebPackPlugin(
            {
                template: './index.html' //This plugin automatically creates an HTML file and injects your bundled JS.
            }
        )
    ],
    optimization: {
        // optimization contains settings that improve performance of the final build.
        //     Examples:
        //     splitting bundles
        //     minimizing code
        //     removing duplicates
        //     caching
        splitChunks: { //splitChunks tells Webpack to split large bundles into smaller files (chunks).
            chunks: "all" //A chunk is a piece of the final bundled code.
            //2 types of chunks are there initial(loaded when app starts first) and async(when dynamically loaded using lazy loading)
        }
        // Problem Without splitChunks

        // Suppose your React app imports many libraries:
        // import React from "react"
        // import lodash from "lodash"
        // import axios from "axios"
        // Webpack may generate one big file:
        // dist/
        //     main.js  (1.5MB)
        // With splitChunks

        // Webpack splits the code into multiple bundles.
        // dist/
        //     main.js
        //     vendors.js

    },
    // without it bundles node_modules and packages into one file but now it will create separate chunks
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        // Required for Single Page Applications (React Router).
        // If a route is not found, the server returns index.html.
        open: true
        // Automatically opens the browser when the dev server starts.
    }
}