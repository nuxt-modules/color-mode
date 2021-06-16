import { readdirSync } from 'fs'
import path from 'path'

import { addPlugin, addTemplate } from '@nuxt/kit'

export function addTemplates (templatesDir, name, options) {
  const templates = readdirSync(templatesDir)
  for (const template of templates) {
    const opts = {
      src: path.resolve(templatesDir, template),
      fileName: path.join(name, template),
      options
    }
    if (template.indexOf('plugin') === 0) {
      addPlugin(opts)
    } else {
      addTemplate(opts)
    }
  }
}
