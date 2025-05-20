<template>
  <v-col cols="12" sm="6" md="4" class="pa-4">
    <v-card elevation="2" rounded="xl" class="pa-6 text-center home-testimonial-card">
      <v-avatar size="80" class="mx-auto mb-4">
        <v-img :src="foto" :alt="`Foto de ${nombre}`" />
      </v-avatar>
      <div class="text-subtitle-1 font-weight-medium mb-2">"{{ comentario }}"</div>
      <div class="text-body-2 text--secondary mt-4">{{ nombre }}</div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  nombre: string
  comentario: string
  foto: string
}>()
</script>