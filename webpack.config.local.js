const common=require('./node_modules/juicyfront/wp5_template')

const conf= common.config({
    port:8888,
    applicationName:'meetings',
    exposes: {},
    baseUrl:'/'
})

module.exports = conf
