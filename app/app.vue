<template>
  <div class="min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    class: 'scroll-smooth'
  }
})
</script>
