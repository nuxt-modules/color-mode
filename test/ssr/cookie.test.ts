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

  it('exposes cookieAttrs to the client via public runtime config', async () => {
    const html = await $fetch('/')
    // The configured domain must reach the client at runtime (serialized in the
    // runtime-config payload), not only baked into the build bundle.
    expect(html).toContain('runtime-cookie-domain.test')
  })
})
