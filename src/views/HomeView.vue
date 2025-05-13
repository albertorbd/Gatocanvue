<template>
  <section class="hero">
    <div class="hero__overlay">
      <h1 class="hero__title">Solo lo mejor para tu mejor amigo</h1>
      <p class="hero__subtitle">En Gatocan de Alberto descubrirás los mejores productos y servicios para tu mascota</p>
      <v-btn class= "hero_btn" color="red" to="/products">Descúbrelos</v-btn>
    </div>
  </section>

  <section class="inicio-products">
  <h2 class="home-product-tittle">Nuestros productos</h2>
  <p class="home-product-p">Contamos con las mejores marcas.</p>

  
       <v-row class="px-6" align="stretch" dense :gutter="24">
        <v-col
          v-for="producto in productos"
          :key="producto.id"
          cols="12"
          sm="6"
          md="4"
          class="pa-4"
        >
          <v-card
            class="product-card"
            color="red lighten-5"
            elevation="4"
            rounded="lg"
            hover
          >
            
            <v-img
              :src="producto.imageUrl"
              height="250px"
              class="grey lighten-4"
              cover
              eager/>

           <v-card-title class="py-6 d-flex justify-space-between align-center px-3">
              <span class="text-h6 font-weight-bold text-center flex-grow-1">
                {{ producto.name }}
              </span>
              <span class="subtitle-1 font-weight-medium">
                {{ producto.price.toFixed(2) }}€
              </span>
            </v-card-title>

            
           

            
        <v-card-actions class="justify-center pb-4 pt-5">
        <v-btn
        :to="`/products/${producto.id}`"
        class="add-btn"
        small
        rounded
        >
        Ver más
        </v-btn>
        </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
</section>

<section class="services-section py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-8">Nuestros servicios</h2>
      <v-row class="px-6" align="stretch" dense :gutter="24">
       
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="2" outlined rounded="lg" class="service-card pa-6 text-center">
            <v-img src="/src/assets/adiestramiento.jpg" height="300"  cover class="mb-4"/>
            <div class="text-h6 font-weight-medium mb-2">Adiestramiento de perros</div>
            <div class="subtitle-2 text--secondary">Clases personalizadas para tu mascota</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="2" outlined rounded="lg" class="service-card pa-6 text-center">
            <v-img src="/src/assets/veterinario.jpg" height="300"  cover class="mb-4"/>
            <div class="text-h6 font-weight-medium mb-2">Veterinario</div>
            <div class="subtitle-2 text--secondary">Revisión y atención sanitaria</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="2" outlined rounded="lg" class="service-card pa-6 text-center">
            <v-img src="/src/assets/alojamiento.jpg" height="300" cover class="mb-4"/>
            <div class="text-h6 font-weight-medium mb-2">Alojamiento para animales</div>
            <div class="subtitle-2 text--secondary">Cuidados y confort 24/7</div>
          </v-card>
        </v-col>
       
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="2" outlined rounded="lg" class="service-card pa-6 text-center">
            <v-img src="/src/assets/paseo.jpg" height="300" cover class="mb-4"/>
            <div class="text-h6 font-weight-medium mb-2">Paseos caninos</div>
            <div class="subtitle-2 text--secondary">Rutas diarias y diversión</div>
          </v-card>
        </v-col>

          <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="2" outlined rounded="lg" class="service-card pa-6 text-center">
            <v-img src="/src/assets/peluqueria.jpg" height="300" cover class="mb-4"/>
            <div class="text-h6 font-weight-medium mb-2">Peluquería</div>
            <div class="subtitle-2 text--secondary">Tu perro tendrá el mejor flow</div>
          </v-card>
        </v-col>
      </v-row>
    </section>

     <section class="testimonials-section py-12">
    <h2 class="text-h4 font-weight-bold text-center mb-10">
      Lo que dicen nuestros clientes
    </h2>
    <v-container>
      <v-row justify="center" align="stretch" dense class="px-6">
       
        <transition-group
          name="testi"
          tag="div"
          class="d-flex flex-wrap justify-center"
        >
          <v-col
            v-for="(t, i) in testimonios"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="pa-4"
          >
            <v-card
              elevation="2"
              rounded="xl"
              class="pa-6 text-center testimonial-card"
            >
              <v-avatar size="80" class="mx-auto mb-4">
                <v-img :src="t.foto" alt="Foto de {{ t.nombre }}" />
              </v-avatar>
              <div class="text-subtitle-1 font-weight-medium mb-2">
                "{{ t.comentario }}"
              </div>
              <div class="text-body-2 text--secondary mt-4">
                 {{ t.nombre }}
              </div>
            </v-card>
          </v-col>
        </transition-group>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productstore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { products: productos } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchAllProducts()
})

const testimonios = [
  {
    nombre: "Pedro G.",
    comentario: "Excelente atención y productos de calidad, ¡mi perro está encantado!",
    foto: "/src/assets/pedro.jpg",
  },
  {
    nombre: "Carlos M.",
    comentario: "El servicio de peluquería fue increíble. ¡Repetiremos seguro!",
    foto: "/src/assets/carlos.jpg",
  },
  {
    nombre: "María P.",
    comentario: "Muy profesionales y atentos. Lo recomiendo 100%.",
    foto: "/src/assets/maria.jpg",
  },
]
</script>

<style scoped>


.testi-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.testi-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.testi-enter-to {
  opacity: 1;
  transform: translateY(0);
}


.testimonial-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.testimonial-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

</style>