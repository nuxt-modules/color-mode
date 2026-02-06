import type { ColorModeInstance } from './types'
import { useState } from '#imports'

export const useColorMode = () => {
  return useState<ColorModeInstance>('color-mode').value ?? (import.meta.test
    ? { preference: 'light', value: 'light', unknown: true, forced: false }
    : undefined) as ColorModeInstance
}
