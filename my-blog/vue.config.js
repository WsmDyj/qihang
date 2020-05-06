'use strict'
const path = require('path')
const webpack = require('webpack')
const devServerPort = 8080 

module.exports = {
  productionSourceMap: false,
  devServer: {
    host: 'localhost', 
    port: devServerPort, 
    https: false,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "src/styles/mixins.scss";
          @import "src/styles/themes.scss";
          @import "src/styles/publish.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: []
  },
}