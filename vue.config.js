module.exports = {
  outputDir: 'build',
  publicPath: '',
  indexPath: 'index.html',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        return args
      })
  },
}