<script setup>
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="bg-white py-4">
    <div class="dark:bg-black">
      <p class="dark:text-white">
        hello tailwind!
      </p>
      <p>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </p>
      <ColorModePicker />
    </div>
  </div>
</template>
