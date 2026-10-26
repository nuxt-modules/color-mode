import { describe } from 'vitest'
import { defineBrowserTests, setupBrowser } from '../browser'

describe('ssr: true, browser', async () => {
  await setupBrowser({ ssr: true })
  defineBrowserTests()
})
