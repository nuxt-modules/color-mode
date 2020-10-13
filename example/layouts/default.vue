<template>
  <div class="container">
    <p>
      <NuxtLogo />
    </p>
    <Nuxt />
    <p class="note">
      Demo based on <a href="https://color-mode.nuxtjs.org">@nuxtjs/color-mode</a> module.
    </p>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Demo of using @nuxtjs/color-mode for NuxtJS, supporting dark mode and custom colors' }
    ]
  }
}
</script>

<style>
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
