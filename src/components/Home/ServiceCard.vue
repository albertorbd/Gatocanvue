<template>
  <v-card elevation="2" outlined rounded="lg" class="home-service-card pa-6 text-center">
    <v-img :src="img" height="300" cover class="mb-4" />
    <div class="text-h6 font-weight-medium mb-2">{{ title }}</div>
    <div class="subtitle-2 text--secondary">{{ subtitle }}</div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  img: string
  title: string
  subtitle: string
}>()
</script>