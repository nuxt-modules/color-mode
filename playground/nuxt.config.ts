import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    // storage: 'cookie',
    // cookieAttrs: {
    //   path: '/',
    //   domain: 'localhost',
    //   secure: true,
    //   samesite: 'None',
    // },
  },
  compatibilityDate: '2024-09-11',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
