<template>
  <aside class="product-filters">
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Buscar productos..."
      class="product-search-bar"
    />

    <select
      :value="selectedBrand"
      @change="$emit('update:selectedBrand', ($event.target as HTMLSelectElement).value)"
      class="product-filter-select"
    >
      <option value="">Todas las marcas</option>
      <option v-for="brand in brands" :key="brand" :value="brand">
        {{ brand }}
      </option>
    </select>

    <select
      :value="selectedCategory"
      @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
      class="product-filter-select"
    >
      <option value="">Todas las categorías</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <select
      :value="priceOrder"
      @change="$emit('update:priceOrder', ($event.target as HTMLSelectElement).value)"
      class="product-filter-select"
    >
      <option value="">Ordenar por precio</option>
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>

    
    <button @click="resetFilters" class="product-reset-button">
      Restablecer filtros
    </button>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  searchQuery: string
  selectedBrand: string
  selectedCategory: string
  priceOrder: string
  brands: string[]
  categories: string[]
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', v: string): void
  (e: 'update:selectedBrand', v: string): void
  (e: 'update:selectedCategory', v: string): void
  (e: 'update:priceOrder', v: string): void
  (e: 'reset'): void
}>()

function resetFilters() {
  emit('reset')
}
</script>

<style scoped>
.product-reset-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.product-reset-button:hover {
  background-color: #ccc;
}
</style>