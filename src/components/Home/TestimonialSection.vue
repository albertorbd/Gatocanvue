<template>
  <section class="home-testimonials-section py-12">
    <h2 class="font-weight-bold text-center mb-10">Lo que dicen nuestros clientes</h2>
    <v-container>
      <v-row justify="center" align="stretch" dense class="px-6">
        <transition-group name="testi" tag="div" class="d-flex flex-wrap justify-center">
          <TestimonialCard
            v-for="(t, i) in testimonios"
            :key="i"
            :nombre="t.nombre"
            :comentario="t.comentario"
            :foto="t.foto"
          />
        </transition-group>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import TestimonialCard from  '@/components/Home/TestimonialCard.vue';
defineProps<{
  testimonios: Array<{ nombre: string; comentario: string; foto: string }>
}>()
</script>