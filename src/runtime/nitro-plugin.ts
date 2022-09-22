import type { NitroAppPlugin } from 'nitropack'

import { script } from '#color-mode-options'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script>${script}</script>`)
  })
}
