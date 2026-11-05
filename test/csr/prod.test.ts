import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import { describe, it, expect } from 'vitest'

const fixture = fileURLToPath(new URL(`../../${process.env.TEST_PLAYGROUND || 'playground'}`, import.meta.url))

describe('ssr: false, target: server, prod mode', async () => {
  let clientVitePlugins: { name?: string, transformIndexHtml?: unknown }[] = []

  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: {
      ssr: false,
      hooks: {
        'vite:configResolved': (config, { isClient }) => {
          if (isClient) {
            clientVitePlugins = ((config.plugins ?? []) as unknown[]).flat(Infinity).filter(plugin => !!plugin && typeof plugin === 'object') as typeof clientVitePlugins
          }
        },
      },
    },
  })

  it('render', async () => {
    const html = await $fetch('/')
    expect(html).toContain('getStorageValue(\'localStorage\', \'nuxt-color-mode\')')
  })

  it('adds the script to HTML entries that Vite transforms itself', () => {
    // e.g. the Storybook preview iframe built by @storybook-vue/nuxt
    const plugin = clientVitePlugins.find(plugin => plugin.name === 'nuxt-color-mode:script')
    expect(plugin).toBeDefined()
    const transform = plugin!.transformIndexHtml as (() => unknown) | { handler: () => unknown }
    const tags = typeof transform === 'function' ? transform() : transform.handler()
    expect(tags).toEqual([{
      tag: 'script',
      children: expect.stringContaining('getStorageValue(\'localStorage\', \'nuxt-color-mode\')'),
      injectTo: 'head',
    }])
  })
})
