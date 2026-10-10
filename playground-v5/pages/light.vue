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
    <h2>This page is forced to light mode</h2>
    <p>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </p>
  </div>
</template>
