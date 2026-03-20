
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
// ModuleFederationPlugin is a Webpack plugin used to share modules between different applications at runtime.
// If you want to reuse a component from App A inside App B, normally you must:

// publish an npm package
// install it
// rebuild the app
// ❌ This is slow and tightly coupled.

// It allows one application to load modules from another application at runtime.

// App A (Remote)
//    exposes → Button component
// App B (Host)
//    imports → Button from App A

// No npm install.
// No rebuild required.

const { use } = require('react');
const port = 3001;
module.exports = {
    mode: "production",
    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[fullhash].js",
        publicPath: "auto" // When Webpack needs to load an extra chunk (like 927.js), it builds the URL like this: chunkURL = publicPath + chunkFilename
        // With "auto":
        // Webpack detects the URL of the current script.
        // remoteEntry.js loaded from
        //     http://localhost:3001/remoteEntry.js
        // So Webpack sets: publicPath = http://localhost:3001/
        // Then the chunk loads correctly:
        // http://localhost:3001/927.js
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },

    module: {

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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [

        new ModuleFederationPlugin({
            name: 'roleComponent', // name of the component throught which parent will access
            filename: 'remoteEntry.js',
            //  webpack will create
            //  dist/
            //     remoteEntry.js
            // This file contains:

            // Exposed modules mapping
            // Dependency info
            // Runtime loader for chunks
            // The host application loads this file.
            // like http://localhost:3001/remoteEntry.js
            exposes: {
                "./RoleList": "./src/components/RoleList.jsx" //1st key is module name visible to other apps and value is relative path to the file
            },
            shared: {
                react: { singleton: true },
                "react-dom": { singleton: true }
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
        }),
        new HtmlWebPackPlugin(
            {
                template: './index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        )
    ],
    optimization: {
        // splitChunks:false, //why i make splitChunks false because for asynchronous component loading (lazy loading) browser creates dynamic URL so for host application it
        // sometimes does create url hostUrl/chunkName not remoteUrl/chunkName sometimes-->when 1.publicPath is not set and for splitChunks:"auto" webpack sometimes create chunks
        // aggresively such that it not clearly connected to main container
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    },
    devServer: {
        port: 3001,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }
}