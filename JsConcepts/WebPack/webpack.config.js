const path = require('path')

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "output.js"
    },
    //loaders
    module: {
        rules: [
            // CSS Modules
            {
                test: /\.module\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            esModule: true
                        }
                    }
                ]
            },

            // Normal Global CSS
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            // use array runs from bottom to top
            // css-loader Runs (First)
            // 1.Loaders run bottom → up, so: css-loader runs first
            // 2.Reads the CSS
            // Sees .button
            // 3.Because modules: true, it:
            // Renames class to something unique
            // .button__x7a92
            // 4.Converts CSS into JavaScript

            // 5.Exports this object:
            // {
            //   button: "button__x7a92"
            // }
            // Now your styles variable becomes:
            // styles.button === "button__x7a92"


            // style-loader Runs

            // Now style-loader runs.
            // It:
            // Takes the processed CSS
            // Creates a <style> tag
            // Injects it into your HTML
            // <style>
            // .button__x7a92 {
            //   color: red;
            // }
            // </style>

            // You import CSS
            //       ↓
            // Webpack sees .module.css
            //       ↓
            // css-loader makes class names unique
            //       ↓
            // style-loader injects CSS into page
            //       ↓
            // Browser applies styles

            // ***********************************

            // Why This Is Powerful
            // Without CSS Modules:
            // All classes are global
            // Naming conflicts happen
            // With CSS Modules:
            // Each file has private styles
            // No conflict
            // Safer for big apps
        ]
    },
    // Normally, browsers don’t understand importing CSS inside JS.
    // So Webpack steps in and says:
    // “Okay, I will process this file.”

    // This defines which loaders Webpack should use.
    // Loaders run from bottom to top ⬆️
    // So execution order is:css-loader → style-loader

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true, //Enables gzip compression.
        port: 3500
    }
}
// What is Gzip compression?

// Gzip is a file compression format that reduces the size of files (like HTML, CSS, JavaScript) before sending them over the internet.

// It makes websites load faster by sending smaller files from the server to the browser.

//  *********************** IMPORTANT ***************************************************** //
// WE CAN MAKE CONFIG FILE FOR DIFFERENT ENVIRONMENT AND DO CHANGES IN SCRIPT IN PACKAGE.JSON
