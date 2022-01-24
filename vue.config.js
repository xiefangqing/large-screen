const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', 'src')
      .set('components', 'components')
      .set('utils', 'utils')
  }
}
