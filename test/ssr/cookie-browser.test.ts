import { createPage } from '@nuxt/test-utils/e2e'
import type { Page } from 'playwright-core'
import { describe, expect, it } from 'vitest'
import { getColorMode, setupBrowser } from '../browser'

async function getCookie(page: Page) {
  const cookies = await page.context().cookies()
  return cookies.find(cookie => cookie.name === 'nuxt-color-mode')?.value
}

describe('cookie storage, browser', async () => {
  await setupBrowser({ colorMode: { storage: 'cookie' } })

  it('stores the preference in a cookie', async () => {
    const page = await createPage('/', { colorScheme: 'dark' })
    await expect.poll(() => getCookie(page)).toBe('system')
    await page.evaluate(() => {
      window.useNuxtApp!().$colorMode.preference = 'sepia'
    })
    await expect.poll(() => getCookie(page)).toBe('sepia')
    await page.goto(page.url(), { waitUntil: 'hydration' })
    expect(await getColorMode(page)).toMatchObject({ preference: 'sepia', value: 'sepia', className: 'sepia-mode' })
    await page.close()
  })
})
