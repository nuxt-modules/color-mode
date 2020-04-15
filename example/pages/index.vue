<template>
  <div class="container">
    <p><NuxtLogo /></p>
    <ColorModePicker />
    <p class="note">
      Demo based on <a href="https://github.com/nuxt-community/color-mode-module">@nuxtjs/color-mode</a> module.
    </p>
  </div>
</template>

<script>
import NuxtLogo from '@/components/NuxtLogo'
import ColorModePicker from '@/components/ColorModePicker'

export default {
  components: {
    NuxtLogo,
    ColorModePicker
  },
  head: {
    title: 'Demo of @nuxtjs/color-mode',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Demo of using @nuxtjs/color-mode for NuxtJS, supporting dark mode and custom colors' }
    ]
  }
}
</script>

<style scoped>
p {
  padding: 20px 0;
  margin: 0;
}
.container {
  text-align: center;
  padding: 50px;
}
.note {
  transition: all .3s;
  display: inline-block;
  padding: 15px 15px;
  border-radius: 5px;
  background-color: var(--bg-secondary);
  color: var(--color-secondary);
}
</style>
