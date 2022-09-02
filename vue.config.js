'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const publicPath = process.env.VUE_APP_BASE_URL || process.env.BASE_URL
const isdev = process.env.NODE_ENV === 'development'

const cdn = {
  js: [],
  css: [],
}
const externals = {}

if (!isdev) {
  cdn.js.push('//cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.runtime.min.js')
  cdn.js.push('//cdn.bootcdn.net/ajax/libs/vue-router/3.0.6/vue-router.min.js')
  cdn.js.push('//cdn.bootcdn.net/ajax/libs/vuex/3.1.0/vuex.min.js')
  cdn.js.push('//cdn.bootcdn.net/ajax/libs/axios/0.20.0/axios.min.js')

  Object.assign(externals, {
    axios: 'axios',
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
  })
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title
const port = process.env.port || process.env.npm_config_port || 9529

module.exports = {
  publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    /* proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://sdk.996box.com`,
        changeOrigin: true,
      },
    }, */
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    externals,
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugin('html').tap(args => {
      args[0].cdn = cdn

      return args
    })

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(!isdev, config => {
      /* config.plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          inline: /runtime\..*\.js$/,
        }])
        .end() */

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    },
    )
  },
}
