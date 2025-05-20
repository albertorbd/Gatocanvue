<template>
  <v-card-actions class="detail-actions">
    <div class="detail-price-chip">
      {{ (price || 0).toFixed(2) }} €
    </div>
    <v-spacer />
    <v-btn class="detail-add-cart-btn" large @click="add()">
      Añadir al carrito
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps<{ price: number }>()
const emit = defineEmits<{
  (e: 'add'): void
}>()

function add() {
  emit('add')
}
</script>
<style scoped>
.detail-actions {
  padding: 16px 24px;
  align-items: center;
}
.detail-price-chip {
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
  color: #e53935;
}
.detail-add-cart-btn {
  background-color: #e53935 !important;
  color: white !important;
  text-transform: none !important;
  padding: 0 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.detail-add-cart-btn:hover {
  background-color: #d32f2f !important;
}
</style>