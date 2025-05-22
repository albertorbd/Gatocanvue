<template>
  <v-app class="detail">
    <DetailNav />

    <FeedbackSnackbar
      :message="feedbackMessage"
      :type="feedbackType"
      :show="showFeedback"
      @update:show="showFeedback = $event"
    />

    <v-main>
      <v-container fluid class="detail-container">
        <v-row justify="center" align="start" class="detail-layout">
          
          <v-col cols="12" md="5" lg="4">
            <v-card class="detail-card" elevation="4" rounded="lg">
              <DetailImage :src="product?.imageUrl ?? ''" />
              <div class="detail-card-info-content">
                <h1 class="detail-product-name">{{ product?.name }}</h1>
                <div class="detail-product-meta">
                  <span class="detail-brand">{{ product?.brand }}</span> •
                  <span class="detail-category">{{ product?.category }}</span>
                </div>
                <div class="detail-price">{{ product?.price.toFixed(2) }} €</div>
              </div>
            </v-card>
          </v-col>

         
          <v-col cols="12" md="7" lg="6">
            <DetailInfo
              :name="product?.name ?? ''"
              :brand="product?.brand ?? ''"
              :category="product?.category ?? ''"
              :description="product?.description ?? ''"
              :longDescription="product?.longDescription ?? ''"
              :price="product?.price ?? 0"
              @add="() => addToCart(product!.id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productstore'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/auth'
import type { Product } from '@/core/product'


import DetailNav from '@/components/ProductDetail/DetailNav.vue'
import DetailImage from '@/components/ProductDetail/DetailImage.vue'
import DetailInfo from '@/components/ProductDetail/DetailInfo.vue'

import FeedbackSnackbar from '@/components/FeedbackSnackbar.vue'


const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const feedbackMessage = ref<string|null>(null)
const feedbackType    = ref<'success'|'error'>('success')
const showFeedback    = ref(false)

function clearFeedback(afterMs = 3000) {
  setTimeout(() => (showFeedback.value = false), afterMs)
}


const product = ref<Product | null>(null)


async function loadProduct(id: number) {
  await productStore.fetchProductById(id)
 
  product.value = productStore.currentProduct
}


async function addToCart(id: number) {
  if (!authStore.user) {
    feedbackType.value    = 'error'
    feedbackMessage.value = 'Debes iniciar sesión para añadir productos al carrito.'
    showFeedback.value    = true
    clearFeedback()
    return
  }
  try {
    await cartStore.addToCart({ productId: id, quantity: 1 })
    feedbackType.value    = 'success'
    feedbackMessage.value = 'Producto añadido al carrito'
  } catch (e) {
    console.error('Error añadiendo al carrito:', e)
    feedbackType.value    = 'error'
    feedbackMessage.value = 'Error al añadir al carrito'
  } finally {
    showFeedback.value = true
    clearFeedback()
  }
}


onMounted(() => {
  const id = Number(route.params.id)
  loadProduct(id)
})
watch(
  () => route.params.id,
  newId => {
    const id = Number(newId)
    loadProduct(id)
  }
)
</script>

<style scoped>
.detail {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.detail-layout {
  margin-top: 100px;
}

.detail-card-info-content {
  padding: 16px 24px;
}

.detail-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
}

.detail-product-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.detail-product-meta {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.detail-short-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 12px;
}

.detail-price {
  font-size: 20px;
  font-weight: bold;
  color: #e53935;
}

</style>