import { fileURLToPath } from 'node:url'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { setup, $fetch, useTestContext } from '@nuxt/test-utils'
import { describe, it, expect } from 'vitest'

const fixture = fileURLToPath(new URL(`../../${process.env.TEST_PLAYGROUND || 'playground'}`, import.meta.url))

describe('ssr: true, @nuxt/vite-server, prod mode', async () => {
  await setup({
    server: true,
    build: true,
    fixture,
    nuxtConfig: { server: { builder: '@nuxt/vite-server' } },
  })

  it('render', async () => {
    const html = await $fetch<string>('/')
    expect(html.match(/getStorageValue\('localStorage', 'nuxt-color-mode'\)/g)).toHaveLength(1)
  })

  it('does not add the script to client chunks', async () => {
    const ctx = useTestContext()
    const dir = join(ctx.nuxt!.options.nitro.output!.dir!, 'public/_nuxt')
    for (const file of await readdir(dir)) {
      if (file.endsWith('.js')) {
        expect(await readFile(join(dir, file), 'utf-8')).not.toContain('getStorageValue')
      }
    }
  })
})
