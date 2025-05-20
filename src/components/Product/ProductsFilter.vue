<template>
  <aside class="product-filters">
   
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value )"
      type="text"
      placeholder="Buscar productos..."
      class="product-search-bar"
    />

    
    <select
      :value="selectedBrand"
      @change="$emit('update:selectedBrand', ($event.target as HTMLSelectElement).value )"
      class="product-filter-select"
    >
      <option value="">Todas las marcas</option>
      <option v-for="brand in brands" :key="brand" :value="brand">
        {{ brand }}
      </option>
    </select>

    
    <select
      :value="selectedCategory"
      @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value )"
      class="product-filter-select"
    >
      <option value="">Todas las categorías</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

   
    <select
      :value="priceOrder"
      @change="$emit('update:priceOrder', ($event.target as HTMLSelectElement).value )"
      class="product-filter-select"
    >
      <option value="">Ordenar por precio</option>
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  searchQuery: string
  selectedBrand: string
  selectedCategory: string
  priceOrder: string
  brands: string[]
  categories: string[]
}>()

defineEmits<{
  (e: 'update:searchQuery', v: string): void
  (e: 'update:selectedBrand', v: string): void
  (e: 'update:selectedCategory', v: string): void
  (e: 'update:priceOrder', v: string): void
}>()
</script>