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

interface Call {
  method: 'matchMedia' | 'addEventListener' | 'setItem'
  arg: string
  phase: 'script' | 'hydrating' | 'hydrated'
}

function instrument(page: Page) {
  return page.addInitScript(() => {
    const calls: Call[] = []
    Object.assign(window, { __calls: calls })
    const phase = (): Call['phase'] => {
      if (!('__NUXT_COLOR_MODE__' in window)) {
        return 'script'
      }
      try {
        return window.useNuxtApp!().isHydrating ? 'hydrating' : 'hydrated'
      }
      catch {
        return 'hydrating'
      }
    }
    const matchMedia = window.matchMedia
    window.matchMedia = (query) => {
      calls.push({ method: 'matchMedia', arg: query, phase: phase() })
      return matchMedia.call(window, query)
    }
    const addEventListener = MediaQueryList.prototype.addEventListener
    MediaQueryList.prototype.addEventListener = function (this: MediaQueryList, ...args: Parameters<typeof addEventListener>) {
      calls.push({ method: 'addEventListener', arg: this.media, phase: phase() })
      return addEventListener.apply(this, args)
    }
    const setItem = Storage.prototype.setItem
    Storage.prototype.setItem = function (this: Storage, key, value) {
      calls.push({ method: 'setItem', arg: `${key}=${value}`, phase: phase() })
      return setItem.call(this, key, value)
    }
  })
}

function getCalls(page: Page, method: Call['method']): Promise<Call[]> {
  return page.evaluate(method => (window as any).__calls.filter((call: Call) => call.method === method), method)
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

  it('listens for system color scheme changes once hydrated', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    await instrument(page)
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getCalls(page, 'addEventListener')).toEqual([{ method: 'addEventListener', arg: '(prefers-color-scheme: dark)', phase: 'hydrated' }])
    await page.close()
  })

  it('reuses the color scheme resolved by the inline script until hydrated', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    await instrument(page)
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getCalls(page, 'addEventListener')).toHaveLength(1)
    const calls = await getCalls(page, 'matchMedia')
    expect(calls.filter(call => call.phase === 'hydrating')).toEqual([])
    await page.close()
  })

  it('picks up a system color scheme change before the app starts', async () => {
    const page = await createPage(undefined, { colorScheme: 'dark' })
    let release!: () => void
    const released = new Promise<void>(resolve => release = resolve)
    await page.route('**/_nuxt/**/*.js', route => released.then(() => route.continue()))
    await page.goto(url('/'), { waitUntil: 'commit' })
    await page.waitForFunction(() => '__NUXT_COLOR_MODE__' in window)
    await page.emulateMedia({ colorScheme: 'light' })
    release()
    await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
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

  it('writes to storage once hydrated', async () => {
    const page = await createPage(undefined, { colorScheme: 'light' })
    await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
    await instrument(page)
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expect.poll(() => getCalls(page, 'setItem')).toEqual([{ method: 'setItem', arg: 'nuxt-color-mode=dark', phase: 'hydrated' }])
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
