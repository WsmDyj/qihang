'use strict'
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: { // 设置代理
    host: 'localhost', //ip地址
    port: 8088, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    // proxy: {
    // },
  },
}