'use strict'
const path = require('path')
{{#mpvue}}
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const MpvueEntry = require('mpvue-entry')
const CopyWebpackPlugin = require('copy-webpack-plugin')
{{/mpvue}}
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
{{#mpvue}}
const entry = MpvueEntry.getEntry({
  pages: './src/router/routes.js',
  app: './src/app.json',
})
const vueLoader = 'mpvue-loader'
{{else}}
  const entry = ['babel-polyfill', './src/main.js']
  const vueLoader = 'vue-loader'
{{/mpvue}}
{{#lint}}const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
}){{/lint}}


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entry,{{#mpvue}}
  target: require('mpvue-webpack-target'),{{/mpvue}}
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: utils.assetsPath('[id].js'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),{{#mpvue}}
      vue: 'mpvue',
      flyio: 'flyio/dist/npm/wx',
      wx: resolve('src/utils/wx'),
      {{else}}
      'vue$': 'vue/dist/vue.esm.js',
      flyio: 'flyio/dist/npm/fly',
      {{/mpvue}}
      '@dui': resolve('node_modules/@ddjf/ddui/packages')
    }
  },
  module: {
    rules: [
      {{#lint}}
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {{/lint}}
      {
        test: /\.vue$/,
        loader: vueLoader,
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        {{#mpvue}}
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: vueLoader,
            options: {
              checkMPEntry: true
            }
          }
        ]
        {{else}}
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        {{/mpvue}}
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },{{#mpvue}
  plugins: [
    new MpvuePlugin(),
    new MpvueEntry(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
        ignore: ['.*']
      }
    ])
  ],{{/mpvue}}
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
