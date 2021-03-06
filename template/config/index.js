'use strict'
// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const ip = require('quick-local-ip').getLocalIP4();

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: {{#mpvue}}''{{else}}'static'{{/mpvue}},
    assetsPublicPath: '/',
    env: require('./dev.env'),
    // webpack-dev-server 相关配置
    {{#if_not mpvue}}
    proxyTable: {},
    // Various Dev Server settings
    host: ip || 'localhost', // can be overwritten by process.env.HOST
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    {{/if_not}}
    {{#lint}}// Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    {{/lint}}{{#unless mpvue}}
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#cheap-module-eval-source-map',{{/unless}}
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: {{#mpvue}}false{{else}}true{{/mpvue}}
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    env: require('./prod.env'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: {{#mpvue}}''{{else}}'static'{{/mpvue}},
    assetsPublicPath: '/',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
