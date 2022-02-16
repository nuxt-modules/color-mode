import { useState } from '#app'
import type { ColorModeInstance } from './types'

export const useColorMode = () => {
  return useState('color-mode').value as ColorModeInstance
}
