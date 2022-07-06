import type { ColorModeInstance } from './types'
import { useState } from '#app'

export const useColorMode = () => {
  return useState('color-mode').value as ColorModeInstance
}
