<template>
  <v-col cols="12" sm="6" md="3" class="pa-4">
    <v-card elevation="4" rounded="lg" class="about-us-team-card pa-6 text-center">
      <v-avatar size="200" class="mx-auto mb-4">
        <v-img :src="img" :alt="alt" />
      </v-avatar>
      <div class="text-h6 font-weight-bold mb-1">{{ name }}</div>
      <div class="subtitle-2 text--secondary">{{ role }}</div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  img: string
  alt: string
  name: string
  role: string
}>()
</script>