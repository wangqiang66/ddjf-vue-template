require('./check-versions')()

const webpack = require('webpack')
const config = require('../config')
{{#mpvue}}
const hardDisk = require('webpack-dev-middleware-hard-disk')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
{{else}}
const portfinder = require('portfinder')
{{/mpvue}}

const devWebpackConfig = require('./webpack.dev.conf')
{{#mpvue}}
const compiler = webpack(devWebpackConfig)
module.exports = hardDisk(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  quiet: true
})
{{else}}
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
{{/mpvue}}
