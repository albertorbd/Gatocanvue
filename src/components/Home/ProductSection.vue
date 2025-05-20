<template>
  <section class="home-products">
    <h2 class="home-product-title">Nuestros productos</h2>
    <p class="home-product-subtitle">Contamos con las mejores marcas.</p>
    <v-row class="home-products-row px-4" dense justify="space-evenly" align="stretch">
      <ProductCard v-for="p in productos" :key="p.id" :producto="p" />
    </v-row>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '@/components/Home/ProductCard.vue';
defineProps<{
  productos: Array<{
    id: number
    name: string
    imageUrl: string
    price: number
  }>
}>()
</script>