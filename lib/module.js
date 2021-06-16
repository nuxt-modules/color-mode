import { resolve } from 'path'
import { readFileSync } from 'fs'

import { defineNuxtModule } from '@nuxt/kit'
import template from 'lodash.template'

import { addTemplates } from './utils'

export default defineNuxtModule({
  name: '@nuxtjs/color-mode',
  configKey: 'colorMode',
  defaults: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  setup (options, nuxt) {
    // Add script to head to detect user or system preference before loading Nuxt (for SSR)
    const scriptPath = resolve(__dirname, 'script.min.js')
    const scriptT = readFileSync(scriptPath, 'utf-8')
    const script = template(scriptT)({ options })

    options.script = script

    nuxt.hook('vue-renderer:spa:prepareContext', ({ head }) => {
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
    addTemplates(templatesDir, 'color-mode', options)
  }
})
