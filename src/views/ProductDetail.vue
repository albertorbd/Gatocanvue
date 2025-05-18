<template>
  <v-app class="detail">
    
    <div class="buttons-container">
      <v-btn
        color="white"
        class="nav-btn"
        small
        @click="$router.push({ name: 'Home' })"
      >
        ← Volver
      </v-btn>
      <v-btn
        color="white"
        class="nav-btn"
        small
        @click="$router.push({ name: 'Products' })"
      >
        Más Productos
      </v-btn>
    </div>

    
    <v-main>
      <v-container fluid class="detail-container">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="detail-card" elevation="4" rounded="lg">
             
              <v-img
                :src="product?.imageUrl"
                class="detail-image"
                height="320px"
                contain
              />

            
              <v-card-title class="detail-title">
              {{ product?.name }}
              </v-card-title>
              <div class="detail-brand-container">
               <span class="detail-brand">{{ product?.brand }}</span>
              </div>
              <v-divider />

              
              <v-card-text class="detail-text">
                {{ product?.description }}
              </v-card-text>

              
              <v-card-actions class="detail-actions">
                <div class="price-chip">
                  {{ product?.price.toFixed(2) }} €
                </div>
                <v-spacer />
                <v-btn class="detail-add-cart-btn" large @click="addToCart(product!.id)">
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

.detail {
  background-color: #f5f5f5; 
  min-height: 100vh;
}


.buttons-container {
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
  z-index: 10;
}
.nav-btn {
  color: #e53935 !important;
  background: #ffffff;
  text-transform: none !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.nav-btn:hover {
  background: #f0f0f0 !important;
}


.detail-container {
  padding-top: 100px;
  padding-bottom: 100px;
}


.detail-card {
 max-width: 500px;    
  margin: 0 auto;    
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
}

.detail-image {
  object-fit: cover;
}


.detail-title {
  font-size: 27px;
  font-weight: 700;
  text-align: center;
  color: #333333;
}
.detail-brand-container {
  text-align: center;
  margin-bottom: 16px;
}
.detail-brand {
  font-size: 0.9rem;
  color: #777;
}

.detail-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555555;
  padding: 16px 24px;
}


.detail-actions {
  padding: 16px 24px;
  align-items: center;
}
.price-chip {
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