<template>
  <ul v-if="items.length" class="cart-list">
    <CartItem
      v-for="item in items"
      :key="item.productId"
      :item="item"
      :quantity="quantities[item.productId]"
      @update-quantity="updateQuantity"
      @remove-item="removeItem"
    />
  </ul>
  <div v-else class="empty-cart">Tu carrito está vacío.</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CartItem from  '@/components/Cart/CartItem.vue';


interface Product {
  imageUrl: string;
  name: string;
  category: string;
  brand: string;
  price: number;
}

interface CartItemType {
  productId: number;
  product: Product;
  quantity: number;
}


const props = defineProps<{
  items: CartItemType[];
}>();


const emit = defineEmits<{
  (e: 'update-quantity', productId: number, quantity: number): void;
  (e: 'remove-item', productId: number): void;
}>();


const quantities = ref<Record<number, number>>({});

watch(
  () => props.items,
  (newItems) => {
    const updated: Record<number, number> = {};
    newItems.forEach((item) => {
      updated[item.productId] = item.quantity;
    });
    quantities.value = updated;
  },
  { immediate: true }
);

function updateQuantity(productId: number, quantity: number) {
  emit('update-quantity', productId, quantity);
}

function removeItem(productId: number) {
  emit('remove-item', productId);
}
</script>