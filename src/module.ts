import { promises as fsp } from 'fs'
import { join, resolve } from 'pathe'
import template from 'lodash.template'
import { addPlugin, addTemplate, defineNuxtModule, isNuxt2, addComponent, addImports, createResolver } from '@nuxt/kit'

import { name, version } from '../package.json'

const DEFAULTS: ModuleOptions = {
  preference: 'system',
  fallback: 'light',
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '-mode',
  dataValue: '',
  storageKey: 'nuxt-color-mode',
  disableTransition: false
}

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'colorMode',
    compatibility: {
      bridge: true
    }
  },
  defaults: DEFAULTS,
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Read script from disk and add to options
    const scriptPath = await resolver.resolve('./script.min.js')
    const scriptT = await fsp.readFile(scriptPath, 'utf-8')
    options.script = template(scriptT)({ options })

    // Inject options via virtual template
    nuxt.options.alias['#color-mode-options'] = addTemplate({
      filename: 'color-mode-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n')
    }).dst

    const runtimeDir = await resolver.resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugins
    for (const template of ['plugin.client', 'plugin.server']) {
      addPlugin(resolve(runtimeDir, template))
    }

    addComponent({ name: options.componentName, filePath: resolve(runtimeDir, 'component.' + (isNuxt2() ? 'vue2' : 'vue3') + '.vue') })
    addImports({ name: 'useColorMode', as: 'useColorMode', from: resolve(runtimeDir, 'composables') })

    // Nuxt 3 and Bridge - inject script
    nuxt.hook('nitro:config', (config) => {
      config.externals = config.externals || {}
      config.externals.inline = config.externals.inline || []
      config.externals.inline.push(runtimeDir)
      config.virtual = config.virtual || {}
      config.virtual['#color-mode-options'] = `export const script = ${JSON.stringify(options.script, null, 2)}`
      config.plugins = config.plugins || []
      config.plugins.push(resolve(runtimeDir, 'nitro-plugin'))
    })

    if (!isNuxt2()) {
      return
    }

    // Nuxt 2 - SSR false
    // @ts-expect-error TODO: add nuxt2 types when merged to bridge
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

    const createHash = await import('crypto').then(r => r.createHash)

    // Nuxt 2 - SSR true
    // @ts-expect-error TODO: add nuxt2 types when merged to bridge
    nuxt.hook('vue-renderer:ssr:csp', (cspScriptSrcHashes) => {
      // @ts-expect-error TODO: add nuxt2 types when merged to bridge
      const { csp } = nuxt.options.render
      const hash = createHash((csp as any).hashAlgorithm)
      hash.update(options.script!)
      cspScriptSrcHashes.push(
        `'${(csp as any).hashAlgorithm}-${hash.digest('base64')}'`
      )
    })

    // In Nuxt 2 dev mode we also inject full script via webpack entrypoint for storybook compatibility
    if (nuxt.options.dev) {
      const { dst } = addTemplate({
        src: scriptPath,
        filename: join('color-mode', 'script.min.js'),
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
  }
})

export interface ModuleOptions {
  /**
   * The default value of $colorMode.preference
   * @default `system`
   */
  preference: string
  /**
   * Fallback value if no system preference found
   * @default `light`
   */
  fallback: string
  /**
   * @default `nuxt-color-mode-script`
   */
  hid: string
  /**
   * @default `__NUXT_COLOR_MODE__`
   */
  globalName: string
  /**
   * @default `ColorScheme`
   */
  componentName: string
  /**
   * @default ''
   */
  classPrefix: string
  /**
   * @default '-mode'
   */
  classSuffix: string
  /**
   * Whether to add a data attribute to the html tag. If set, it defines the key of the data attribute.
   * For example, setting this to `theme` will output `<html data-theme="dark">` if dark mode is enabled.
   * @default ''
   */
  dataValue: string
  /**
   * @default 'nuxt-color-mode'
   */
  storageKey: string
  /**
   * The script that will be injected into the head of the page
   */
  script?: string
  /**
   * Disable transition on switch
   *
   * @see https://paco.me/writing/disable-theme-transitions
   * @default false
   */
  disableTransition?: boolean
}
