<template>
  <v-img
    :src="src"
    class="detail-image"
    height="320px"
    contain
  />
</template>

<script setup lang="ts">
defineProps<{ src: string }>()
</script>

<style scoped>
.detail-image {
  object-fit: cover;
}
</style>