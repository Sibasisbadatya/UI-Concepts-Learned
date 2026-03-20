
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

const { use } = require('react');
const port = 3002;
module.exports = {
    mode: "production",
    entry: {
        main: "./src/main.jsx",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[fullhash].js"
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

        new CleanWebpackPlugin(),
        new ModuleFederationPlugin({
            name: "userComponent",
            filename: "remoteEntry.js",
            exposes: {
                "./UserList": "./src/components/UserList.jsx"
            },
            shared: {
                react: {
                    singleton: true
                },
                "react-dom": {
                    singleton: true
                }
            }
        }),
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

        // splitChunks: {
        //     chunks: "all"
        // },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    },
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }
}