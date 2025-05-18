<template>
  <div class="cart-view">
    <h1 class="cart-title">Mi Carrito</h1>

    <div v-if="loading" class="cart-loading">Cargando carrito…</div>

    <div v-else>
      <ul v-if="cart && cart.items.length" class="cart-list">
        <li v-for="item in cart.items" :key="item.productId" class="cart-item">
          <img :src="item.product.imageUrl" alt="Imagen del producto" class="cart-item__img"/>
          <div class="cart-item__details">
            <h2 class="cart-item__name">{{ item.product.name }}</h2>
            <p class="cart-item__category">{{ item.product.category }} · {{ item.product.brand }}</p>
            <p class="cart-item__price">{{ item.product.price.toFixed(2) }}€</p>
            <div class="cart-item__qty">
              <label class="cart-item__qty-label">
                Cantidad:
                <input
                  type="number"
                  v-model.number="quantities[item.productId]"
                  @change="updateQty(item.productId)"
                  min="1"
                  class="cart-item__qty-input"
                />
              </label>
            </div>
            <p class="cart-item__subtotal">Subtotal: {{ (item.product.price * item.quantity).toFixed(2) }}€</p>
          </div>
          <button class="cart-btn-remove" @click="removeItem(item.productId)">Eliminar</button>
        </li>
      </ul>

      <div v-else class="empty-cart">Tu carrito está vacío.</div>

      <div v-if="cart && cart.items.length" class="cart-summary">
        <div class="cart-summary__total">
          <span>Total:</span>
          <strong>{{ total.toFixed(2) }}€</strong>
        </div>
        <div class="cart-summary__actions">
          <button class=" cart-btn-clear" @click="clearCart">Vaciar Carrito</button>
          <button class=" cart-btn-purchase" @click="goToCheckout">Comprar Carrito</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import type { CartItem } from '@/core/cart';
import type { CartUpdateDto } from '@/core/cart';

const cartStore = useCartStore();
const loading = ref(true);
const router = useRouter();
const quantities = ref<Record<number, number>>({});
const cart = computed(() => cartStore.cart);
const total = computed(() => cart.value
  ? cart.value.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  : 0
);

onMounted(async () => {
  await cartStore.fetchCart();
  if (cartStore.cart) {
    cartStore.cart.items.forEach((item: CartItem) => {
      quantities.value[item.productId] = item.quantity;
    });
  }
  loading.value = false;
});

async function updateQty(productId: number) {
  const quantity = quantities.value[productId];
  if (quantity > 0) {
    const dto: CartUpdateDto = { productId, quantity };
    await cartStore.updateQuantity(dto);
  }
}

async function removeItem(productId: number) {
  await cartStore.removeFromCart(productId);
  delete quantities.value[productId];
}

async function clearCart() {
  await cartStore.clearCart();
  quantities.value = {};
}

function goToCheckout() {
  router.push({ name: 'Checkout' });
}
</script>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
.cart-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}
.cart-loading,
.empty-cart {
  text-align: center;
  color: #666;
  font-style: italic;
}
.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  padding: 1rem;
}
.cart-item__img {
  width: 150px;     
  height: 150px;     
  object-fit: contain;
  border-radius: 8px;
  margin-right: 1rem;
}
.cart-item__details {
  flex: 1;
}
.cart-item__name {
  margin: 0;
  font-size: 1.2rem;
}
.cart-item__category {
  color: #888;
  margin: 0.25rem 0;
}
.cart-item__price {
  font-weight: bold;
  margin: 0.5rem 0;
}
.cart-item__qty {
  margin: 0.5rem 0;
}
.cart-item__qty-label {
  display: flex;
  align-items: center;
}
.cart-item__qty-input {
  width: 60px;
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.cart-btn-remove {
  padding: 0.6rem 1.2rem;           
  border: none;
  border-radius: 9999px;           
  background: #e53e3e;             
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: background 0.2s ease, transform 0.1s ease;
}
.cart-btn-remove:hover {
  background: #c53030;              
  transform: translateY(-1px);
}
.cart-item__subtotal {
  margin-left: 1rem;
  font-weight: bold;
  white-space: nowrap;
}
.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.cart-summary__total {
  font-size: 1.2rem;
}

.cart-summary__actions {
  display: flex;
  gap: 0.75rem;      
}
.cart-summary__actions button {
  margin-left: 0.5rem;
}
.cart-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.cart-btn-clear,
.cart-btn-purchase {
  padding: 0.8rem 1.6rem;       
  border-radius: 9999px;       
  font-size: 1rem;             
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: background 0.2s ease, transform 0.1s ease;
}

.cart-btn-clear {
  background: #f56565;          
  color: #fff;
}
.cart-btn-clear:hover {
  background: #e53e3e;          
  transform: translateY(-1px);
}
.cart-btn-purchase {
  background: #38b2ac;          
  color: #fff;
}
.cart-btn-purchase:hover {
  background: #319795;          
  transform: translateY(-1px);
}
</style>
