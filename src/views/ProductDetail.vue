<template>
  <v-app class="detail">
    <div class="buttons-container">
      <v-btn
        color="red"
        small
        class="bg-white elevation-2"
        @click="$router.push({ name: 'Home' })"
      > Volver
      </v-btn>
      <v-btn
        color="red"
        small
        class="bg-white elevation-2"
        @click="$router.push({ name: 'Products' })"
      >
     Más Productos
      </v-btn>
    </div>

    <v-main>
  <v-container fluid class="fill-height d-flex justify-center align-center pa-4">
    <v-row no-gutters class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <v-card
          
          class="mx-auto pa-6"
          color="white"
          max-width="560px"
          height="auto"
        >
          <v-img :src="product?.imageUrl" height="350px" class="mb-6" contain />

          <v-card-title class="text-h4 font-weight-bold text-center mb-4 card-title">
            {{ product?.name }}
          </v-card-title>
          <v-divider />

          <v-card-text>
            <p class="text-h6 mb-4">{{ product?.description }}</p>
            <p class="text-subtitle-1 mb-2">
               {{ product?.brand }}
            </p>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-chip outlined small class="ma-0" size="large">
              {{ product?.price.toFixed(2) }} €
            </v-chip>
          </v-card-actions>

          <v-card-actions class="justify-center mt-6">
            <v-btn color="white" class="detail-cart-btn" @click="addToCart(product!.id)">
              Añadir al carrito
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-main>
  </v-app>
</template>



<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue'
import { useProductStore } from '@/stores/productstore'
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/core/product'
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'ProductDetail',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const productStore = useProductStore()
    const product = ref<Product | null>(null)
    const loading = ref(false)
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    
    const loadProduct = async (id: number) => {
      loading.value = true
      product.value = null          
      await productStore.fetchProductById(id)
      product.value = productStore.currentProduct
      loading.value = false
    }

    async function addToCart(productId: number) {
  if (!authStore.user) {
    alert('Debes iniciar sesión para añadir productos al carrito.');
    return;
  }
  try {
    await cartStore.addToCart({ productId, quantity: 1 });
    alert('Producto añadido al carrito');
  } catch (e) {
    console.error('Error añadiendo al carrito:', e);
  }
}
    
    onMounted(() => {
      loadProduct(props.id)
    })

    
    watch(() => props.id, (newId) => {
      loadProduct(newId)
    })

    return { product, loading, addToCart }
  }
})
</script>

<style scoped>

.buttons-container {
  position: static;
  margin-top: 40px;
  margin-left: 40px;
  display: flex;
  gap: 8px;
  z-index: 1500;  
}

.card-title {

color: black;
}

.detail{
    background-color:#df8d99 ;
}

.detail-cart-btn{
    background-color: red;
}

</style>