module.exports = {
  css: {
    loaderOptions: {
      less: {
      }
    }
  },
  devServer: {
    port: 8888,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: 'http://60.205.1.144:8182/'
  }
}
