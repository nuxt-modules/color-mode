const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['@nuxtjs/color-scheme'],
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: '@nuxtjs/color-scheme.js',
    options
  })
}

module.exports.meta = require('../package.json')
