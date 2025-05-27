<template>
  <div class="detail-info-wrapper">
    <div class="detail-left-column">
      <h1 class="detail-product-name">{{ name }}</h1>
      <div class="detail-product-meta">
        <span class="detail-brand">{{ brand }}</span> •
        <span class="detail-category">{{ category }}</span>
      </div>
      <p class="detail-short-description">{{ description }}</p>
      <div class="detail-price">{{ price.toFixed(2) }} €</div>
    </div>

    <div class="detail-right-column">
      <h2 class="detail-long-description-title">Descripción detallada</h2>
      <p class="detail-long-description">{{ longDescription }}</p>

      <v-btn
        class="detail-add-to-cart-btn"
        dark
        large
        @click="$emit('add')"
      >
        Añadir al carrito
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  brand: string
  category: string
  description: string
  longDescription: string
  price: number
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<style scoped>
.detail-info-wrapper {
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 24px;
  flex-wrap: wrap;
}

.detail-left-column {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-right-column {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-product-name {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  word-break: break-word;
}

.detail-product-meta {
  font-size: 14px;
  color: #888;
}

.detail-short-description {
  font-size: 16px;
  color: #555;
}

.detail-long-description-title {
  font-size: 20px;
  font-weight: 600;
  color: #444;
}

.detail-long-description {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.detail-price {
  font-size: 20px;
  font-weight: bold;
  color: #e53935;
  margin-top: 8px;
}

.detail-add-to-cart-btn {
  align-self: flex-start;
  margin-top: auto;
  background-color: #e90202;
  color: #fff;
}

.detail-add-to-cart-btn:hover{
 background-color: #ca4848  ; 
} 
</style>