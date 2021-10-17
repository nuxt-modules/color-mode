import { join, resolve } from 'path'
import { promises as fsp } from 'fs'
import crypto from 'crypto'
import { defineNuxtModule, addTemplate } from '@nuxt/kit'
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
  async setup (options, nuxt) {
    // Add script to head to detect user or system preference before loading Nuxt (for SSR)
    const scriptPath = resolve(__dirname, 'script.min.js')
    const scriptT = await fsp.readFile(scriptPath, 'utf-8')
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

    // In dev mode we also inject full script via webpack entrypoint for storybook compatibility
    if (nuxt.options.dev) {
      const { dst } = addTemplate({
        src: resolve(__dirname, 'script.js'),
        filename: join('color-mode', 'script.js'),
        options
      })
      nuxt.hook('webpack:config', (configs) => {
        for (const config of configs) {
          if (config.name !== 'server') {
            config.entry.app.unshift(resolve(nuxt.options.buildDir, dst))
          }
        }
      })
    }
    nuxt.hook('vue-renderer:ssr:csp', (cspScriptSrcHashes) => {
      const { csp } = nuxt.options.render
      const hash = crypto.createHash(csp.hashAlgorithm)
      hash.update(options.script)
      cspScriptSrcHashes.push(`'${csp.hashAlgorithm}-${hash.digest('base64')}'`)
    })

    // Add all templates
    const templatesDir = resolve(__dirname, 'templates')
    await addTemplates(templatesDir, 'color-mode', options)
  }
})
