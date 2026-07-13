import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import { describe, it, expect } from 'vitest'

const fixture = fileURLToPath(new URL('../../playground', import.meta.url))

describe('cookie storage: cookieAttrs is runtime-configurable', async () => {
  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: {
      colorMode: {
        storage: 'cookie',
        cookieAttrs: { domain: 'runtime-cookie-domain.test' },
      },
    },
  })

  it('exposes cookieAttrs to the client via public runtime config, deep-merged with the module defaults', async () => {
    const html = await $fetch('/')
    // The configured domain must reach the client at runtime (serialized in the
    // runtime-config payload), not only baked into the build bundle.
    expect(html).toContain('runtime-cookie-domain.test')
    // A partial `cookieAttrs` override is deep-merged (via defu) with the module
    // defaults, so `maxAge`/`path` are still present alongside the custom `domain`.
    expect(html).toContain('cookieAttrs:{maxAge:31536000,path:"/",domain:"runtime-cookie-domain.test"}')
  })
})
