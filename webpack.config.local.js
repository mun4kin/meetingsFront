const common=require('./webpack.config.common')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const conf= common.config

conf.plugins.push(new HtmlWebPackPlugin({
    template: "./public/indexLocal.html",
    favicon: "./public/favicon.ico",
}),)


module.exports = conf
