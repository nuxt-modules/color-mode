const { readFile } = require('fs').promises
const { resolve } = require('path')
const defu = require('defu')
const template = require('lodash.template')

module.exports = async function (moduleOptions) {
  const defaults = {
    preference: 'system',
    fallback: 'light',
    cookie: {
      key: 'nuxt-color-mode',
      options: {
        path: this.options.router.base
      }
    }
  }
  // defu(object, defaults)
  const options = defu({
    ...this.options.colorMode,
    ...moduleOptions
  }, defaults)

  // Add plugin to inject $colorMode
  this.addPlugin({
    src: resolve(__dirname, 'templates', 'plugins', 'color-mode.client.js'),
    fileName: 'plugins/color-mode.client.js',
    options
  })
  this.addPlugin({
    src: resolve(__dirname, 'templates', 'plugins', 'color-mode.server.js'),
    fileName: 'plugins/color-mode.server.js',
    options
  })

  // Add script to head to detect user or system preference before loading Nuxt (for SSR)
  let script = await readFile(resolve(__dirname, 'templates', 'script.js'), 'utf-8')
  script = template(script)({ options })
  // minify script for production
  if (!this.options.dev) {
    const { minify } = require('terser')
    script = minify(script).code
  }
  this.options.head.script = this.options.head.script || []
  this.options.head.script.push({
    hid: 'nuxt-color-mode-script',
    innerHTML: script,
    pbody: true
  })
  this.options.head.__dangerouslyDisableSanitizersByTagID = this.options.head.__dangerouslyDisableSanitizersByTagID || {}
  this.options.head.__dangerouslyDisableSanitizersByTagID['nuxt-color-mode-script'] = ['innerHTML']
}
