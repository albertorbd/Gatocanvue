<template>
  <div v-if="total > 0" class="cart-summary">
    <div class="cart-summary__total">
      <span>Total:</span>
      <strong>{{ total.toFixed(2) }}€</strong>
    </div>
    <div class="cart-summary__actions">
      <button class="cart-btn-clear" @click="clearCart">Vaciar Carrito</button>
      <button class="cart-btn-purchase" @click="goToCheckout">Comprar Carrito</button>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  total: number;
}>();


const emit = defineEmits<{
  (event: 'clear-cart'): void;
  (event: 'checkout'): void;
}>();


function clearCart() {
  emit('clear-cart');
}


function goToCheckout() {
  emit('checkout');
}
</script>