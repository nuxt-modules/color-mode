import { promises as fsp } from 'node:fs'
import { resolve } from 'pathe'
import { addPlugin, addTemplate, defineNuxtModule, addComponent, addImports, createResolver } from '@nuxt/kit'
import { readPackageJSON } from 'pkg-types'
import { resolveModulePath } from 'exsolve'
import { gte } from 'semver'

import { name, version } from '../package.json'
import type { ColorModeStorage } from './runtime/types'

const DEFAULTS: ModuleOptions = {
  preference: 'system',
  fallback: 'light',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '',
  dataValue: '',
  storageKey: 'nuxt-color-mode',
  storage: 'localStorage',
  cookieAttrs: { 'max-age': '31536000', 'path': '/' },
  disableTransition: false,
}

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'colorMode',
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Read script from disk and add to options
    const scriptPath = resolver.resolve('./script.min.js')
    const scriptT = await fsp.readFile(scriptPath, 'utf-8')
    type ScriptOption = 'storageKey' | 'preference' | 'globalName' | 'classPrefix' | 'classSuffix' | 'dataValue' | 'fallback'
    options.script = scriptT.replace(/<%= options\.([^ ]+) %>/g, (_, option: ScriptOption) => options[option]).trim()

    // Inject options via virtual template
    const storageTypes: Record<ColorModeStorage, `"${ColorModeStorage}"`> = {
      cookie: '"cookie"',
      localStorage: '"localStorage"',
      sessionStorage: '"sessionStorage"',
    }
    addTemplate({
      filename: 'color-mode-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
        (key === 'storage' ? `/** @type {${Object.values(storageTypes).join(' | ')}} */\n` : '')
        + `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    })

    const runtimeDir = resolver.resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugins
    for (const template of ['plugin.client', 'plugin.server']) {
      addPlugin(resolve(runtimeDir, template))
    }

    addComponent({ name: options.componentName, filePath: resolve(runtimeDir, 'component.vue') })
    addImports({ name: 'useColorMode', as: 'useColorMode', from: resolve(runtimeDir, 'composables') })

    // inject script
    nuxt.hook('nitro:config', (config) => {
      config.externals = config.externals || {}
      config.externals.inline = config.externals.inline || []
      config.externals.inline.push(runtimeDir)
      config.virtual = config.virtual || {}
      config.virtual['#color-mode-options'] = `export const script = ${JSON.stringify(options.script, null, 2)}`
      config.plugins = config.plugins || []
      config.plugins.push(resolve(runtimeDir, 'nitro-plugin'))
    })

    // @ts-expect-error module may not be installed
    nuxt.hook('tailwindcss:config', async (tailwindConfig) => {
      const tailwind = resolveModulePath('tailwindcss', { from: nuxt.options.modulesDir, try: true }) || 'tailwindcss'
      const isAfter341 = await readPackageJSON(tailwind).then(twPkg => gte(twPkg.version || '3.0.0', '3.4.1'))
      tailwindConfig.darkMode = tailwindConfig.darkMode ?? [isAfter341 ? 'selector' : 'class', `[class~="${options.classPrefix}dark${options.classSuffix}"]`]
    })
  },
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
   * @default ''
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
   * The default storage
   * @default `localStorage`
   */
  storage?: ColorModeStorage
  /**
   * Storage cookie's attributes
   */
  cookieAttrs?: object
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
