<template>
  <section class="home-services-section py-12">
    <h2 class="text-h4 font-weight-bold text-center mb-8">Nuestros servicios</h2>

   
    <v-row class="px-6" align="stretch" dense>
      <v-col
        v-for="(s, i) in primaryServices"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="pa-4"
      >
        
        <v-card elevation="2" outlined rounded="lg" class="home-service-card pa-6 text-center">
          <v-img :src="s.img" height="300" cover class="mb-4" />
          <div class="text-h6 font-weight-medium mb-2">{{ s.title }}</div>
          <div class="subtitle-2 text--secondary">{{ s.subtitle }}</div>
        </v-card>
      </v-col>
    </v-row>

    
    <v-row class="px-6 mt-6" justify="center" align="stretch" dense :gutter="24">
      <v-col
        v-for="(s, i) in secondaryServices"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="pa-4"
      >
        <v-card elevation="2" outlined rounded="lg" class="home-service-card pa-6 text-center">
          <v-img :src="s.img" height="300" cover class="mb-4" />
          <div class="text-h6 font-weight-medium mb-2">{{ s.title }}</div>
          <div class="subtitle-2 text--secondary">{{ s.subtitle }}</div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
const primaryServices = [
  {
    img: '/images/adiestramiento.jpg',
    title: 'Adiestramiento de perros',
    subtitle: 'Clases personalizadas para tu mascota',
  },
  {
    img: '/images/veterinario.jpg',
    title: 'Veterinario',
    subtitle: 'Revisión y atención sanitaria',
  },
  {
    img: '/images/alojamiento.jpg',
    title: 'Alojamiento para animales',
    subtitle: 'Cuidados y confort 24/7',
  },
]

const secondaryServices = [
  {
    img: '/images/paseo.jpg',
    title: 'Paseos caninos',
    subtitle: 'Rutas diarias y diversión',
  },
  {
    img: '/images/peluqueria.jpg',
    title: 'Peluquería',
    subtitle: 'Tu perro tendrá el mejor flow',
  },
]
</script>