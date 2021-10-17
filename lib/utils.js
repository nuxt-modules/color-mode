import { promises as fsp } from 'fs'
import path from 'path'
import { addPlugin, addTemplate } from '@nuxt/kit'

export async function addTemplates (templatesDir, name, options) {
  const templates = await fsp.readdir(templatesDir)
  for (const template of templates) {
    const opts = {
      src: path.resolve(templatesDir, template),
      filename: path.join(name, template),
      options
    }
    if (template.indexOf('plugin') === 0) {
      addPlugin(opts)
    } else {
      addTemplate(opts)
    }
  }
}
