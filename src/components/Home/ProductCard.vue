<template>
  <v-col cols="8" sm="4" md="4" class="pa-5">
    <v-card class="home-product-card" elevation="2" rounded="xl" hover>
      <v-img :src="producto.imageUrl" class="home-card-image" cover eager />
      <v-card-text class="home-card-content">
        <div class="home-card-title">{{ producto.name }}</div>
      </v-card-text>
      <v-card-actions class="home-card-actions">
        <v-btn :to="`/products/${producto.id}`" class="home-btn-view" small rounded>
          Ver más
        </v-btn>
        <div class="home-card-price">{{ producto.price.toFixed(2) }}€</div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  producto: {
    id: number
    name: string
    imageUrl: string
    price: number
  }
}>()
</script>