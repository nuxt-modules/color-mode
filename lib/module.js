import { resolve } from 'path'
import { promises as fsp } from 'fs'
import defu from 'defu'
import template from 'lodash.template'
import { addTemplates } from './utils'

export default async function (moduleOptions) {
  const defaults = {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    cookie: {
      key: 'nuxt-color-mode',
      options: {
        path: this.options.router.base,
        sameSite: 'lax'
      }
    }
  }
  // defu(object, defaults)
  const options = defu({
    ...this.options.colorMode,
    ...moduleOptions
  }, defaults)

  // Add all templates
  const templatesDir = resolve(__dirname, 'templates')
  await addTemplates.call(this, templatesDir, 'color-mode', options)

  // Add script to head to detect user or system preference before loading Nuxt (for SSR)
  const scriptPath = resolve(__dirname, 'script.min.js')
  const scriptT = await fsp.readFile(scriptPath, 'utf-8')
  const script = template(scriptT)({ options })

  this.options.head.script = this.options.head.script || []
  this.options.head.script.push({
    hid: options.hid,
    innerHTML: script,
    pbody: true
  })

  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  this.options.head[serializeProp] = this.options.head[serializeProp] || {}
  this.options.head[serializeProp][options.hid] = ['innerHTML']
}
