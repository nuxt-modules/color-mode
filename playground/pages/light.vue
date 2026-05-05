<script setup lang="ts">
useSeoMeta({
  title: 'Light page (forced)',
})
definePageMeta({
  colorMode: 'light',
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      This page is forced to light mode
    </h2>
    <p class="py-5">
      Forcing a color mode is great for implementing dark mode on a website incrementally. <a
        href="https://color-mode.nuxtjs.org/#force-a-color-mode"
        class="text-emerald-600 dark:text-emerald-400 sepia:text-[#6b4c2a] underline"
      >Learn more</a>.
    </p>
    <p class="pb-5">
      <NuxtLink
        to="/"
        class="text-emerald-600 dark:text-emerald-400 sepia:text-[#6b4c2a] underline"
      >
        Home
      </NuxtLink>
    </p>
  </div>
</template>
