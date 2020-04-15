import { join } from 'path'
import { loadNuxtConfig } from 'nuxt-edge'
import { setup, get } from '@nuxtjs/module-test-utils'

jest.setTimeout(60000)

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    const config = await loadNuxtConfig({
      rootDir: join(__dirname, '..', 'example')
    })
    nuxt = (await setup(config)).nuxt
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('@nuxtjs/color-mode')
  })
})
