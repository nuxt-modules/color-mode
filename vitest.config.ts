import { configDefaults, defineConfig } from 'vitest/config'

const devTests = ['test/**/dev.test.ts']

const playgrounds = [
  { name: 'nuxt4', env: {} },
  { name: 'nuxt5', env: { TEST_PLAYGROUND: 'playground-v5' } },
]

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
      include: ['src'],
    },
    projects: playgrounds.flatMap(({ name, env }) => [
      { extends: true, test: { name, env, exclude: [...configDefaults.exclude, ...devTests] } },
      // dev servers started in the same playground share its buildDir
      { extends: true, test: { name: `${name}:dev`, env, include: devTests, fileParallelism: false } },
    ]),
  },
})
