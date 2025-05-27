<template>
  <section class="about-us-team-section py-12">
    <h2 class="text-center mb-8">Nuestro equipo</h2>
    <v-container>
      <v-row justify="center" align="stretch" dense :gutter="24">
        <TeamMemberCard
          v-for="(m, i) in members"
          :key="i"
          :img="m.img"
          :alt="m.alt"
          :name="m.name"
          :role="m.role"
        />
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import TeamMemberCard from '@/components/About/TeamCard.vue';

const members = [
  {
    img: '/images/veterinaria.jpg',
    alt: 'Dra. Martínez',
    name: 'Erica Martínez',
    role: 'Veterinaria',
  },
  {
    img: '/images/adiestrador.jpg',
    alt: 'Alberto Gómez',
    name: 'Alberto Gómez',
    role: 'Adiestrador',
  },
  {
    img: '/images/cuidadora.jpg',
    alt: 'Ana Román',
    name: 'Ana Román',
    role: 'Cuidador',
  },
  {
    img: '/images/cuidador.jpg',
    alt: 'Miguel Sánchez',
    name: 'Santiago del Pino',
    role: 'Cuidador',
  },
]
</script>