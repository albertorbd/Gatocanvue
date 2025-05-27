<template>
  <section class="home-services-section py-12">
    <h2 class="text-center mb-8">Nuestros servicios</h2>

   
    <v-row class="px-6" align="stretch" dense>
      <v-col
        v-for="(s, i) in primaryServices"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="pa-4"
      >
        <router-link :to="s.link" class="text-decoration-none">
          <v-card elevation="2" outlined rounded="lg" class="home-service-card pa-6 text-center">
            <v-img :src="s.img" height="300" cover class="mb-4" />
            <h5 class=" mb-2">{{ s.title }}</h5>
            <p class="">{{ s.subtitle }}</p>
          </v-card>
        </router-link>
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
        <router-link :to="s.link" class="text-decoration-none">
          <v-card elevation="2" outlined rounded="lg" class="home-service-card pa-6 text-center">
            <v-img :src="s.img" height="300" cover class="mb-4" />
            <h5 class="mb-2">{{ s.title }}</h5>
            <p class="">{{ s.subtitle }}</p>
          </v-card>
        </router-link>
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
    link: '/adiestramiento',
  },
  {
    img: '/images/veterinario.jpg',
    title: 'Veterinario',
    subtitle: 'Revisión y atención sanitaria',
    link: '/veterinario',
  },
  {
    img: '/images/alojamiento.jpg',
    title: 'Alojamiento para animales',
    subtitle: 'Cuidados y confort 24/7',
    link: '/alojamiento',
  },
]

const secondaryServices = [
  {
    img: '/images/paseo.jpg',
    title: 'Paseos caninos',
    subtitle: 'Rutas diarias y diversión',
    link: '/paseos',
  },
  {
    img: '/images/peluqueria.jpg',
    title: 'Peluquería',
    subtitle: 'Tu perro tendrá el mejor flow',
    link: '/peluqueria',
  },
]
</script>