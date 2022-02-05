const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
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
