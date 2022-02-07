import { useNuxtApp } from '#app'
import type { ColorModeInstance } from '../types'

export const useColorMode = () => {
  return useNuxtApp().$colorMode as ColorModeInstance
}
