<template>
  <div class="cart-view">
    <h1 class="cart-title">Mi Carrito</h1>

    <div v-if="loading" class="cart-loading">Cargando carrito…</div>

    <div v-else>
      <CartList
        v-if="cartItems.length"
        :items="cartItems"
        @update-quantity="updateItemQuantity"
        @remove-item="removeCartItem"
      />
      <div v-else class="empty-cart">Tu carrito está vacío.</div>

      <CartActions
        v-if="cartItems.length"
        :total="cartTotal"
        @clear-cart="clearCart"
        @checkout="proceedToCheckout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import CartList from '@/components/Cart/CartList.vue';
import CartActions from '@/components/Cart/CartActions.vue';

const cartStore = useCartStore();
const loading = ref(true);
const router = useRouter();

const cartItems = computed(() => cartStore.cart?.items || []);
const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

onMounted(async () => {
  await cartStore.fetchCart();
  loading.value = false;
});

async function updateItemQuantity(productId: number, quantity: number) {
  if (quantity > 0) {
    await cartStore.updateQuantity({ productId, quantity });
  }
}

async function removeCartItem(productId: number) {
  await cartStore.removeFromCart(productId);
}

async function clearCart() {
  await cartStore.clearCart();
}

function proceedToCheckout() {
  router.push({ name: 'Checkout' });
}
</script>

<style scoped>

</style>