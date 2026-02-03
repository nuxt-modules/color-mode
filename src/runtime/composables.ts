import type { ColorModeInstance } from './types'
import { useState } from '#imports'

export const useColorMode = () => {
  return useState<ColorModeInstance>('color-mode').value ?? {
    // Fallback for test environments where plugins haven't initialized the state
    preference: 'light',
    value: 'light',
    unknown: true,
    forced: false,
  }
}
