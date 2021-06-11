import { join } from 'path'
import { setup, get } from '@nuxtjs/module-test-utils'
import colorModeModule from '../'

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    const rootDir = join(__dirname, '..', 'example')

    const config = {
      ssr: false,
      rootDir,
      modules: [
        '@nuxtjs/svg',
        colorModeModule
      ]
    }

    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('nuxt-color-mode')
  })
})
