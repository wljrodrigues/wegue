const path = require('path')

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  assetsDir: 'static',
  runtimeCompiler: true,
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Wegue WebGIS'
    },
    embedded: {
      entry: 'src/main.js',
      template: 'public/embedded.html',
      filename: 'embedded.html',
      title: 'Wegue WebGIS Embedded'
    }
  },

  devServer: {
    clientLogLevel: 'warn',
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true // necessary for FriendlyErrorsPlugin
  },

  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.formatter = require('eslint-formatter-friendly')
      })

    return config
      .plugin('copy')
      .tap(options => {
        options[0][0].from = path.resolve(options[0][0].from, '../app/static')
        options[0][0].to = process.env.NODE_ENV === 'production'
          ? path.resolve(options[0][0].to, '../dist/static')
          : 'static'
        return options
      })
  }
}
