<template>
  <li class="product-item">
    <div class="product-image-container">
      <img :src="producto.imageUrl" alt="Imagen del producto" />
    </div>
    <div class="product-info">
      <h2 class="product-name">{{ producto.name }}</h2>
      <div class="product-tags">
        <v-chip small outlined class="mr-1">{{ producto.category }}</v-chip>
        <v-chip small outlined>{{ producto.brand }}</v-chip>
      </div>
      <p class="product-desc">{{ producto.description }}</p>
    </div>
    <div class="product-footer">
      <span class="product-price">{{ producto.price.toFixed(2) }}€</span>
      <div class="product-buttons">
        <button class="product-btn-add-cart" @click="$emit('add', producto.id)">
          Añadir al carrito
        </button>
        <button class="product-btn-view-more" @click="$emit('view', producto.id)">
          Ver más
        </button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  producto: {
    id: number
    name: string
    imageUrl: string
    price: number
    description: string
    category: string
    brand: string
  }
}>()

defineEmits<{
  (e: 'add', id: number): void
  (e: 'view', id: number): void
}>()
</script>