<template>
  <section class="product-list">
    <ul class="product-ul">
      <ProductItem
        v-for="p in products"
        :key="p.id"
        :producto="p"
        @add="onAdd"
        @view="onView"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ProductItem from '@/components/Product/ProductItem.vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: Array<any>
}>()

const emits = defineEmits<{
  (e: 'add', id: number): void
  (e: 'view', id: number): void
}>()

function onAdd(id: number) { emits('add', id) }
function onView(id: number) { emits('view', id) }
</script>