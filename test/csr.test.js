import { join } from 'path'
import { setupTest, get } from '@nuxt/test-utils'

describe('module', () => {
  const rootDir = join(__dirname, '..', 'example')

  setupTest({
    server: true,
    rootDir,
    config: {
      ssr: false
    }
  })

  test('render', async () => {
    const { body } = await get('/')
    expect(body).toContain('nuxt-color-mode')
  })
})
