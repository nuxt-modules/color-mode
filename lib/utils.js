import { promises as fsp } from 'fs'
import path from 'path'

export async function addTemplates (templatesDir, name, options) {
  const templates = await fsp.readdir(templatesDir)
  for (const template of templates) {
    const opts = {
      src: path.resolve(templatesDir, template),
      fileName: path.join(name, template),
      options
    }
    if (template.indexOf('plugin') === 0) {
      this.addPlugin(opts)
    } else {
      this.addTemplate(opts)
    }
  }
}
