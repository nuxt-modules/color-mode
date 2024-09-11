export default defineAppConfig({
  docus: {
    title: 'Nuxt Color Mode',
    layout: 'default',
    url: 'https://color-mode.nuxtjs.org',
    description: 'Dark and Light mode with auto detection made easy with Nuxt 🌗',
    socials: {
      twitter: 'nuxt_js',
      github: 'nuxt-modules/color-mode',
    },
    aside: {
      level: 1,
    },
    image: '/cover.jpg',
    header: {
      logo: true,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com',
      },
      iconLinks: [
        {
          label: 'Nuxt',
          href: 'https://nuxt.com',
          icon: 'IconNuxt',
        },
        {
          label: 'Vue Telescope',
          href: 'https://vuetelescope.com',
          icon: 'IconVueTelescope',
        },
      ],
    },
  },
})
