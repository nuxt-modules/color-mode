<script setup>
useSeoMeta({
  title: 'Nuxt Color Mode',
})
</script>

<template>
  <div>
    <button
      v-for="theme of ['system', 'light', 'dark', 'sepia']"
      :key="theme"
      @click="$colorMode.preference = theme"
    >
      {{ theme }}
    </button>
    <p>
      <ColorScheme
        placeholder="..."
        tag="span"
      >
        Preference: <b>{{ $colorMode.preference }}</b>
        <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
        <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
      </ColorScheme>
    </p>
    <NuxtPage />
  </div>
</template>

<style>
.dark-mode {
  background: #111827;
  color: #f3f4f6;
}
.sepia-mode {
  background: #f6ecd8;
  color: #3d2f24;
}
</style>
