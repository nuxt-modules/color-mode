import type { NitroAppPlugin } from 'nitropack'

// @ts-expect-error untyped virtual module
import { script } from '#color-mode-options'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script>${script}</script>`)
  })
}
