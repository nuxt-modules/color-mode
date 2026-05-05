<script setup>
useSeoMeta({
  title: 'Nuxt Color Mode',
  description: 'Demo of using @nuxtjs/color-mode for Nuxt, supporting dark mode and custom colors',
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 sepia:bg-[#f1e7d0] sepia:text-[#433422] transition-colors duration-300">
    <div class="container mx-auto text-center p-14">
      <NuxtLogo class="inline-block pb-5" />
      <ColorModePicker />
      <NuxtPage />
      <p class="p-4 rounded-lg bg-white dark:bg-gray-800 sepia:bg-[#eae0c9] text-gray-600 dark:text-gray-300 sepia:text-[#504231] inline-block">
        Demo using <a
          href="https://color-mode.nuxtjs.org"
          class="text-emerald-600 dark:text-emerald-400 sepia:text-[#6b4c2a] underline"
        >@nuxtjs/color-mode</a> with <a
          href="https://tailwindcss.com"
          class="text-emerald-600 dark:text-emerald-400 sepia:text-[#6b4c2a] underline"
        >Tailwind CSS</a>.
      </p>
    </div>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
}
</style>
