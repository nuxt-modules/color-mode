export interface ColorModeInstance {
  preference: string
  readonly value: string
  unknown: boolean
  forced: boolean
}

export type ColorModeStorage = 'localStorage' | 'sessionStorage' | 'cookie'

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp extends PluginInjection { }
}

declare module 'vue-router' {
  interface RouteMeta {
    colorMode?: string
  }
}

interface PluginInjection {
  $colorMode: ColorModeInstance
}

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ComponentCustomProperties extends PluginInjection { }
}
