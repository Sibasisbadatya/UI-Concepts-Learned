
const commonConfig = require('./webpack.config.cjs')
const {merge} = require('webpack-merge')

const path = require('path');

module.exports = merge(commonConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.[fullhash].js"
    }
});