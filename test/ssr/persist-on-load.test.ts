import { createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import { getCalls, getColorMode, gotoWithHeldHydration, instrument, resumeHydration, setupBrowser } from '../browser'

describe('ssr: true, persistOnLoad: false', async () => {
  await setupBrowser({ ssr: true, colorMode: { persistOnLoad: false } })

  it('writes nothing on a first visit without a change', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    await instrument(page)
    await page.goto(url('/'), { waitUntil: 'hydration' })
    // Give the idle callback after hydration a chance to run.
    await page.evaluate(() => new Promise(resolve => requestIdleCallback(() => setTimeout(resolve, 50), { timeout: 1000 })))
    expect(await getColorMode(page)).toMatchObject({ preference: 'system', value: 'dark', className: 'dark-mode' })
    expect(await getCalls(page, 'setItem')).toEqual([])
    expect(await page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBeNull()
    await page.close()
  })

  it('stores a preference changed after load, and reads it back', async () => {
    const page = await createPage('/', { colorScheme: 'light' })
    await page.evaluate(() => {
      window.useNuxtApp!().$colorMode.preference = 'dark'
    })
    await expect.poll(() => page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('dark')
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getColorMode(page)).toMatchObject({ preference: 'dark', value: 'dark', className: 'dark-mode' })
    await page.close()
  })

  it('stores a preference changed during hydration', async () => {
    const page = await createPage(undefined, { colorScheme: 'light' })
    await gotoWithHeldHydration(page, '/')
    await page.waitForFunction(() => window.useNuxtApp?.().$colorMode.unknown === false)
    await page.evaluate(() => {
      window.useNuxtApp!().$colorMode.preference = 'sepia'
    })
    await resumeHydration(page)
    await expect.poll(() => page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('sepia')
    await page.close()
  })

  it('stores a change back to the initial preference made during hydration', async () => {
    const page = await createPage(undefined, { colorScheme: 'light' })
    await gotoWithHeldHydration(page, '/')
    await page.waitForFunction(() => window.useNuxtApp?.().$colorMode.unknown === false)
    await page.evaluate(() => {
      const { $colorMode } = window.useNuxtApp!()
      $colorMode.preference = 'dark'
      return Promise.resolve().then(() => {
        $colorMode.preference = 'system'
      })
    })
    await resumeHydration(page)
    await expect.poll(() => page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('system')
    await page.close()
  })

  it('reads and keeps a stored preference', async () => {
    const page = await createPage(undefined, { colorScheme: 'light' })
    await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getColorMode(page)).toMatchObject({ preference: 'dark', value: 'dark', className: 'dark-mode' })
    expect(await page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('dark')
    await page.close()
  })
})
