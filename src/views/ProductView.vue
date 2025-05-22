<template>
 
  <FeedbackSnackbar
    :message="feedbackMessage"
    :type="feedbackType"
    :show="showFeedback"
    @update:show="showFeedback = $event"
  />

  <div class="product-container">
    <h1 class="product-title">Nuestros Productos</h1>

    <div class="product-content">
      
      <ProductFilters
        v-model:searchQuery="productStore.searchQuery"
        v-model:selectedBrand="productStore.selectedBrand"
        v-model:selectedCategory="productStore.selectedCategory"
        v-model:priceOrder="productStore.priceOrder"
        :brands="uniqueBrands"
        :categories="uniqueCategories"
        @reset="resetAllFilters"
      />

     
      <ProductList
        :products="productStore.products"
        @add="addToCart"
        @view="goToProduct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useProductStore } from '@/stores/productstore'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


import FeedbackSnackbar from '@/components/FeedbackSnackbar.vue'
import ProductFilters   from '@/components/Product/ProductsFilter.vue'
import ProductList      from '@/components/Product/ProductList.vue'

const productStore = useProductStore()
const cartStore    = useCartStore()
const authStore    = useAuthStore()
const router       = useRouter()


const feedbackMessage = ref<string|null>(null)
const feedbackType    = ref<'success'|'error'>('success')
const showFeedback    = ref(false)

function clearFeedback(afterMs = 3000) {
  setTimeout(() => (showFeedback.value = false), afterMs)
}



async function addToCart(productId: number) {
  if (!authStore.user) {
    feedbackType.value    = 'error'
    feedbackMessage.value = 'Debes iniciar sesión para añadir productos al carrito.'
    showFeedback.value    = true
    clearFeedback()
    return
  }
  try {
    await cartStore.addToCart({ productId, quantity: 1 })
    feedbackType.value    = 'success'
    feedbackMessage.value = 'Producto añadido al carrito correctamente.'
  } catch {
    feedbackType.value    = 'error'
    feedbackMessage.value = 'Ha ocurrido un error al añadir el producto.'
  } finally {
    showFeedback.value = true
    clearFeedback()
  }
}


function goToProduct(id: number) {
  router.push({ name: 'ProductDetail', params: { id } })
}

function resetAllFilters() {
  productStore.searchQuery = ''
  productStore.selectedBrand = ''
  productStore.selectedCategory = ''
  productStore.priceOrder = ''
  productStore.fetchAllProducts()
}


onMounted(() => {
  productStore.resetFilters()
  productStore.fetchAllProducts()
})


watch(
  () => [
    productStore.searchQuery,
    productStore.selectedBrand,
    productStore.selectedCategory,
    productStore.priceOrder,
  ],
  () => {
    productStore.fetchAllProducts()
  }
)


const uniqueBrands = computed(() =>
  Array.from(new Set(productStore.products.map(p => p.brand)))
)
const uniqueCategories = computed(() =>
  Array.from(new Set(productStore.products.map(p => p.category)))
)
</script>

<style scoped>

</style>