<template>
  <HomeHero />

  <ProductsSection :productos="productos" />

  <ServicesSection />

  <TestimonialsSection :testimonios="testimonios" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productstore'
import { storeToRefs } from 'pinia'
import HomeHero from '@/components/Home/HomeHero.vue'
import ProductsSection from '@/components/Home/ProductSection.vue'
import ServicesSection from '@/components/Home/ServiceSection.vue'
import TestimonialsSection from '@/components/Home/TestimonialSection.vue'

const productStore = useProductStore()
const { products: productos } = storeToRefs(productStore)

onMounted(() => {
  productStore.resetFilters()
  productStore.fetchAllProducts()
})

const testimonios = [
  {
    nombre: "Pedro G.",
    comentario: "Excelente atención y productos de calidad, ¡mi perro está encantado!",
    foto: "/images/pedro.jpg",
  },
  {
    nombre: "Carlos M.",
    comentario: "El servicio de peluquería fue increíble. ¡Repetiremos seguro!",
    foto: "/images/carlos.jpg",
  },
  {
    nombre: "María P.",
    comentario: "Muy profesionales y atentos. Lo recomiendo 100%.",
    foto: "/images/maria.jpg",
  },
]
</script>

<style scoped>

</style>