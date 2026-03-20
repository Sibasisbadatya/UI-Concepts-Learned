
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container
const CopyPlugin = require("copy-webpack-plugin");
// copy-webpack-plugin is used to copy files or folders from a source directory to the output directory (dist) without modifying them.
// If logo.png is not imported like this:
// import logo from "./logo.png";  like if they used in src path or in any other form
// then Webpack doesn't know it should include that file.
// After build:
//     dist
// │
// └── main.js
// logo.png and robots.txt are missing.

// Why WebPack doesnot copy automatically
// ---------------------------------------------
// Webpack's job is to build dependency graphs.
// entry → imports → dependencies
// main.js
// ↓
// import App.js
// ↓
// import style.css  files outside this chain is ignored

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Withput this by help of "style-loader", "css-loader" 
// CSS → converted to JS → injected into <style> tag in browser
// css in the JS bundle so, to make css in separate bundle we use this plugin

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// optimize-css-assets-webpack-plugin is a Webpack plugin used to minimize (compress) CSS files in the production build.
// Normal CSS
// body {
//     background: white;
//     margin: 0px;
//     padding: 0px;
// }
// This has:
//     spaces
//     line breaks
//     formatting

// These are useful for developers, but not required by the browser.

// After Optimization

// The plugin compresses CSS:
//   body{background:white;margin:0;padding:0}
// smaller file,faster download,better performance


const { use } = require('react');
const port = 3000;
module.exports = {
    mode: "production",  // in development env webpack sometimes doesnot aggresively minimise files even if you added minimizer
    // **Benefit of `mode: "production"` in Webpack (short line):**

    // 👉 Production mode automatically optimizes the bundle by enabling JavaScript minification,
    // tree shaking (removing unused code), dead code elimination, and module concatenation to produce smaller and faster builds.

    // 1️⃣ JS Minification (Terser)
    // -----------------------------------------------------------
    // Concept:
    // Reduces file size by removing spaces, comments, and shortening variables

    // function add(a, b) {
    //   // add two numbers
    //   return a + b;
    // }

    // console.log(add(2,3));

    // ------->
    // function n(n,o){return n+o}console.log(n(2,3));


    // 2️⃣ Tree Shaking

    // Concept:
    // Removes unused exports from modules.

    // math.js
    // export function add(a,b){
    //   return a+b;
    // }

    // export function subtract(a,b){
    //   return a-b;
    // }

    // app.js
    // import { add } from "./math";

    // console.log(add(2,3));
    // subtract() is never used.

    // FINAL BUNDLE
    // function add(a,b){return a+b}
    // console.log(add(2,3))


    // 3️⃣ Dead Code Elimination

    // Concept:
    // Removes code that will never execute.

    // Before
    // if(false){
    //   console.log("This will never run");
    // }
    // console.log("Hello");
    // After
    // console.log("Hello");

    // ************* IMPORTANT **************
    // MODULE concatenation study in sepaarte

    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[fullhash].js"
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
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                //previously before using MiniCssExtractPlugin we used simply "style-loader"

                // | Feature      | style-loader         | MiniCssExtractPlugin.loader |
                // | ------------ | -------------------- | --------------------------- |
                // | CSS location | inside JS            | separate CSS file           |
                // | Injection    | `<style>` tag via JS | `<link>` tag                |
                // | Performance  | slower in production | faster                      |
                // | Build type   | development          | production                  |
                // | Caching      | poor                 | good                        |

                // css-loader
                //     Reads CSS files and converts them into JavaScript modules like  and inject into main.js
                // Normally JavaScript cannot import CSS.
                // When Webpack sees this import:

                    // It sends the file to css-loader
                    // css-loader parses the CSS
                    // It converts it into a JavaScript module

                    // CSS
                    // .container {
                    //     color: red;
                    //     }

                    // Converted JS Module (simplified)
                    // module.exports = ".container { color: red; }"; //Now webpack can bundle it properly

                    // Resolves @import Statements
                    //     css-loader processes CSS imports just like JS imports.

                    // also converts .title  →  App_title__3sd92 if modules:true would have there

                // style-loader
                //     Injects the CSS into the browser DOM using <style> tags.
            },
            // css-loader
            // Reads CSS files and converts them into JavaScript modules. it makes the class name into hashed one if modules:true is there

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
                use: {
                    loader: 'file-loader',//does 2 things 1.copies the image into build output folder and 2.returns the URL.
                    options: {
                        name: '[name].[contenthash].[ext]', //contentHash hash based on filecontent   * file-loader does not support fullhash properly
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader' //processes HTML content and assets(heer it may use file-loader internally) inside HTML 
                    }
                ]
            }
        ]
    },
    plugins: [
        // Each plugin is created using: new PluginName()
        new CleanWebpackPlugin(), //It deletes old files in the output folder (dist) before every build.
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css" // The name of the bundled css will be the name of the component from where it invoked
        }),
        new HtmlWebPackPlugin(
            {
                template: './index.html',//This plugin automatically creates an HTML file and injects your bundled JS.
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                    //you can add some other also
                }
            }
        ),
        new ModuleFederationPlugin({
            name: "RoleManagement",
            filename: "remoteEntry.js",
            remotes: {
                "RoleCard": "roleComponent@http://localhost:3001/remoteEntry.js", //key is local alias used inside this app
                "UserCard": "userComponent@http://localhost:3002/remoteEntry.js"
            },
            // If the remote app exposes something like:
            // exposes: {
            // "./RoleList": "./src/components/RoleList.jsx"
            // }

            // Then your host app can import it like:
            // import RoleList from "RoleCard/RoleList";
            shared: {
                react: { singleton: true, },
                "react-dom": { singleton: true }
            }
                // shared → Share libraries between host and remote apps.
                // singleton: true → Ensure only one instance of React/ReactDOM exists across all micro-frontends.
                // eager: true → Load the shared library immediately at startup, not lazily.
                // Without sharing React as a singleton, host and remote may load separate React copies, which can cause errors like:
                // Invalid hook call
                // Hooks can only be called inside the body of a function component
                // Why throws error
                
                // React internally tracks hooks using its own instance.
                // Component rendered by React A
                // Hooks belong to React B

                // React cannot track the hooks correctly, so it throws:
                // Invalid hook call
                // Hooks can only be called inside the body of a function component
                
                // ****** IMPORTANT ********
                //  react: { singleton: true,eager:true }, this eager:true is not required if asynchronous import is there in main entry file (main.js)

        })
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
        },
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
        //     bundle.js  
        minimizer: [
            `...`,// keep existing JS minimizer   --- It keeps Webpack's default JS minimizer (Terser).IMPORTANT When we add something new here Webpack removes default minimizer  
            new CssMinimizerPlugin(),
        ]
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