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
    <h2 class="text-2xl font-bold">
      This page is forced with light mode
    </h2>
    <p>
      Forcing a color mode is great to implement dark mode to a website incrementally, <a href="https://color-mode.nuxtjs.org/#force-a-color-mode">learn more</a> about it.
    </p>
    <p>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </p>
  </div>
</template>
