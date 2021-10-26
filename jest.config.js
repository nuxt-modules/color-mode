module.exports = {
  preset: '@nuxt/test-utils',
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/module.js',
    'lib/utils.js'
  ],
  transform: {
    '^.+\\.mjs$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!@nuxt/kit)/.*'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  }
}
