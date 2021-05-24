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
    storageKey: 'nuxt-color-mode'
  }
  // defu(object, defaults)
  const options = defu({
    ...this.options.colorMode,
    ...moduleOptions
  }, defaults)

  // Add script to head to detect user or system preference before loading Nuxt (for SSR)
  const scriptPath = resolve(__dirname, 'script.min.js')
  const scriptT = await fsp.readFile(scriptPath, 'utf-8')
  const script = template(scriptT)({ options })

  options.script = script

  this.nuxt.hook('vue-renderer:spa:prepareContext', ({ head }) => {
    const script = {
      hid: options.hid,
      innerHTML: options.script,
      pbody: true
    }

    head.script.push(script)

    const serializeProp = '__dangerouslyDisableSanitizersByTagID'
    head[serializeProp] = head[serializeProp] || {}
    head[serializeProp][options.hid] = ['innerHTML']
  })

  // Add all templates
  const templatesDir = resolve(__dirname, 'templates')
  await addTemplates.call(this, templatesDir, 'color-mode', options)
}
