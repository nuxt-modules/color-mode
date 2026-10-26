import { fileURLToPath } from 'node:url'
import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import type { NuxtConfig } from '@nuxt/schema'
import type { Page } from 'playwright-core'
import { expect, it } from 'vitest'

const fixture = fileURLToPath(new URL(`../${process.env.TEST_PLAYGROUND || 'playground'}`, import.meta.url))
const holdHydration = fileURLToPath(new URL('./fixtures/hold-hydration.client.ts', import.meta.url))

export async function setupBrowser(nuxtConfig: NuxtConfig) {
  await setup({
    server: true,
    build: true,
    browser: true,
    fixture,
    nuxtConfig: { ...nuxtConfig, plugins: [holdHydration] },
  })
}

export function getColorMode(page: Page) {
  return page.evaluate(() => {
    const { $colorMode } = window.useNuxtApp!()
    return {
      preference: $colorMode.preference,
      value: $colorMode.value,
      forced: $colorMode.forced,
      className: document.documentElement.className,
    }
  })
}

async function gotoWithHeldHydration(page: Page, path: string) {
  await page.addInitScript(() => Object.assign(window, { __holdHydration: true }))
  await page.goto(url(path), { waitUntil: 'commit' })
  await page.waitForFunction(() => '__resumeHydration' in window)
}

function resumeHydration(page: Page) {
  return page.evaluate(() => (window as any).__resumeHydration())
}

export function defineBrowserTests() {
  it('resolves the system color scheme', async () => {
    const page = await createPage('/', { colorScheme: 'dark' })
    expect(await getColorMode(page)).toMatchObject({ preference: 'system', value: 'dark', className: 'dark-mode' })
    await page.close()
  })

  it('follows system color scheme changes', async () => {
    const page = await createPage('/', { colorScheme: 'dark' })
    await page.emulateMedia({ colorScheme: 'light' })
    await expect.poll(() => getColorMode(page)).toMatchObject({ value: 'light', className: 'light-mode' })
    await page.close()
  })

  it('picks up a system color scheme change during hydration', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    await gotoWithHeldHydration(page, '/')
    await page.emulateMedia({ colorScheme: 'light' })
    await resumeHydration(page)
    await expect.poll(() => getColorMode(page)).toMatchObject({ value: 'light', className: 'light-mode' })
    await page.close()
  })

  it('stores the preference', async () => {
    const page = await createPage('/', { colorScheme: 'dark' })
    await expect.poll(() => page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('system')
    await page.close()
  })

  it('restores a stored preference', async () => {
    const page = await createPage(undefined, { colorScheme: 'light' })
    await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getColorMode(page)).toMatchObject({ preference: 'dark', value: 'dark', className: 'dark-mode' })
    expect(await page.evaluate(() => localStorage.getItem('nuxt-color-mode'))).toBe('dark')
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

  it('forces the color mode on a page', async () => {
    const page = await createPage('/light', { colorScheme: 'dark' })
    expect(await getColorMode(page)).toMatchObject({ preference: 'system', value: 'light', forced: true, className: 'light-mode' })
    await page.evaluate(() => window.useNuxtApp!().$router.push('/'))
    await expect.poll(() => getColorMode(page)).toMatchObject({ value: 'dark', forced: false, className: 'dark-mode' })
    await page.close()
  })

  it('resolves the system color scheme when leaving a forced page during hydration', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    await gotoWithHeldHydration(page, '/light')
    await page.evaluate(() => window.useNuxtApp!().$router.push('/'))
    await expect.poll(() => getColorMode(page)).toMatchObject({ value: 'dark', forced: false })
    await resumeHydration(page)
    await expect.poll(() => getColorMode(page)).toMatchObject({ value: 'dark', forced: false, className: 'dark-mode' })
    await page.close()
  })
}
