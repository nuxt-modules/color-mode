import { describe } from 'vitest'
import { defineBrowserTests, setupBrowser } from '../browser'

describe('ssr: false, browser', async () => {
  await setupBrowser({ ssr: false })
  defineBrowserTests()
})
