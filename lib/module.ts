import { promises as fsp } from 'fs'
import crypto from 'crypto'
import { join, resolve } from 'pathe'
import template from 'lodash.template'
import { addPlugin, addTemplate, defineNuxtModule, addComponentsDir } from '@nuxt/kit'

const DEFAULTS: ColorModeOptions = {
  preference: 'system',
  fallback: 'light',
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '-mode',
  storageKey: 'nuxt-color-mode'
}

export default defineNuxtModule({
  configKey: 'colorMode',
  defaults: DEFAULTS,
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
        fileName: join('color-mode', 'script.js'),
        options
      })
      nuxt.hook('webpack:config', (configs) => {
        for (const config of configs) {
          if (config.name !== 'server') {
            (config.entry as any).app.unshift(resolve(nuxt.options.buildDir, dst!))
          }
        }
      })
    }
    nuxt.hook('vue-renderer:ssr:csp', (cspScriptSrcHashes) => {
      const { csp } = nuxt.options.render
      const hash = crypto.createHash((csp as any).hashAlgorithm)
      hash.update(options.script!)
      cspScriptSrcHashes.push(
        `'${(csp as any).hashAlgorithm}-${hash.digest('base64')}'`
      )
    })

    // Inject options via virtual template
    nuxt.options.alias['#color-mode-options'] = addTemplate({
      src: '',
      filename: 'color-mode-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n')
    }).dst

    // Add plugins
    for (const template of ['plugin.client.mjs', 'plugin.server.mjs']) {
      addPlugin(resolve(__dirname, 'templates', template))
    }

    addComponentsDir({ path: resolve(__dirname, 'templates/components'), extensions: ['mjs'], prefix: options.componentName })
  }
})

export interface ColorModeOptions {
  /**
   * Default: `system`
   */
  preference: string, // default value of $colorMode.preference
  /**
   * Default: `light`
   */
  fallback: string, // fallback value if not system preference found
  /**
   * Default: `nuxt-color-mode-script`
   */
  hid: string,
  /**
   * Default: `__NUXT_COLOR_MODE__`
   */
  globalName: string,
  /**
   * Default: `ColorScheme`
   */
  componentName: string,
  /**
   * Default: ''
   */
  classPrefix: string,
  /**
   * Default: '-mode'
   */
  classSuffix: string,
  /**
   * Default: 'nuxt-color-mode'
   */
  storageKey: string
  /**
   * The script that will be injected into the head of the page
   */
  script?: string
}

export type ColorModeConfig = Partial<ColorModeOptions>
