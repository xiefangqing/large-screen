/* https://cli.vuejs.org/zh/config/#vue-config-js */
/* https://github.com/stephencookdev/speed-measure-webpack-plugin */
/* eslint-disable */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const IS_PROD = ['production'].includes(process.env.NODE_ENV)

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin({
  outputFormat: 'human'
})

module.exports = {
  lintOnSave: false,
  // 不生成map文件，加速生产环境构建，封闭源码
  productionSourceMap: false,
  configureWebpack: smp.wrap({
    plugins: [],
    // 开发环境避免vue文件重名无法进入断点
    devtool: IS_PROD ? 'none' : 'eval-source-map' 
  }),
  // 别名
  chainWebpack: config => {
    config.resolve.alias
      .set('img', resolve('src/assets/img'))
  },
  // 全局共享变量
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  }
}
