import Vue from 'vue'

export type { ColorModeConfig, ColorModeOptions } from '../lib/module'
export interface ColorModeInstance extends Vue {
  preference: string,
  value: string,
  unknown: boolean,
  forced: boolean
}
