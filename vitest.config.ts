import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
      include: ['src'],
    },
    projects: [
      { extends: true, test: { name: 'nuxt4' } },
      { extends: true, test: { name: 'nuxt5', env: { TEST_PLAYGROUND: 'playground-v5' } } },
    ],
  },
})
