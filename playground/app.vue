<script setup>
useSeoMeta({
  title: 'Nuxt Color Mode',
  description: 'Demo of using @nuxtjs/color-mode for Nuxt, supporting dark mode and custom colors',
})
</script>

<template>
  <div class="container mx-auto text-center p-14">
    <NuxtLogo class="inline-block pb-5" />
    <ColorModePicker />
    <NuxtPage />
    <p class="p-4 rounded-lg bg-[--bg-secondary] text-[--color-secondary] inline-block">
      Demo based on <a href="https://color-mode.nuxtjs.org">@nuxtjs/color-mode</a> module.
    </p>
  </div>
</template>

<style lang="postcss">
:root {
  --color: #243746;
  --color-primary: #158876;
  --color-secondary: #0e2233;
  --bg: #f3f5f4;
  --bg-secondary: #fff;
  --border-color: #ddd;
}

.dark {
  --color: #ebf4f1;
  --color-primary: #41b38a;
  --color-secondary: #fdf9f3;
  --bg: #091a28;
  --bg-secondary: #071521;
  --border-color: #0d2538;
}
.sepia {
  --color: #433422;
  --color-secondary: #504231;
  --bg: #f1e7d0;
  --bg-secondary: #eae0c9;
  --border-color: #ded0bf;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg);
  color: var(--color);
  transition: background-color .3s;
}
a {
  color: var(--color-primary);
  text-decoration: underline;
}
p {
  @apply p-5;
}
</style>
