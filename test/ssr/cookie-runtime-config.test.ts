import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import { describe, it, expect } from 'vitest'

const fixture = fileURLToPath(new URL('../../playground', import.meta.url))

describe('cookie storage: cookieAttrs can be set directly via runtimeConfig', async () => {
  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: {
      colorMode: {
        // `storage` is build-time only, so cookie storage must still be enabled here.
        storage: 'cookie',
      },
      runtimeConfig: {
        public: {
          colorMode: {
            cookieAttrs: { domain: 'direct-runtime-config.test' },
          },
        },
      },
    },
  })

  it('deep-merges a runtimeConfig-only cookieAttrs with the module defaults', async () => {
    const html = await $fetch('/')
    // No `colorMode.cookieAttrs` module option was set: the value set directly
    // under `runtimeConfig.public.colorMode.cookieAttrs` is still deep-merged
    // (via defu) with the module's default `maxAge`/`path`.
    expect(html).toContain('cookieAttrs:{maxAge:31536000,path:"/",domain:"direct-runtime-config.test"}')
  })
})
