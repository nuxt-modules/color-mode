import { join } from 'path'
import { readFile } from 'fs-extra'
import { setupTest, get, getContext } from '@nuxt/test-utils'

describe('ssr: false, dev mode', () => {
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
    expect(body).toContain('nuxt-color-mode-script')
  })
})

describe('ssr: false, target: server, prod mode', () => {
  const rootDir = join(__dirname, '..', 'example')

  setupTest({
    server: true,
    build: true,
    rootDir,
    config: {
      ssr: false,
      target: 'server'
    }
  })

  test('render', async () => {
    const { body } = await get('/')
    expect(body).toContain('nuxt-color-mode-script')
  })
})

describe('ssr: false, target: static, generated files', () => {
  const rootDir = join(__dirname, '..', 'example')

  setupTest({
    generate: true,
    rootDir,
    config: {
      ssr: false
    }
  })

  test('generated file', async () => {
    const { nuxt } = getContext()
    const generateDir = nuxt.options.generate.dir
    const files = ['index.html', '200.html']
    for (const file of files) {
      const contents = await readFile(join(generateDir, file), 'utf-8')
      expect(contents).toMatch('nuxt-color-mode-script')
    }
  })
})
