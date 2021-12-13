// const common=require('./webpack.config.common')
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const conf= common.config
//
// conf.plugins.push(new HtmlWebPackPlugin({
//     template: "./public/indexLocal.html",
//     favicon: "./public/favicon.ico",
// }),)
//
//
// module.exports = conf
const common=require('./node_modules/juicyfront/wp5_template')

const conf= common.config({
    port:8888,
    applicationName:'meetings',
    russianName:'Meetings',
    exposes: {},
    baseUrl:'/'
})

module.exports = conf
