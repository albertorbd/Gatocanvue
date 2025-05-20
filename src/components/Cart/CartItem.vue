<template>
  <li class="cart-item">
    <img :src="item.product.imageUrl" alt="Imagen del producto" class="cart-item__img" />
    <div class="cart-item__details">
      <h2 class="cart-item__name">{{ item.product.name }}</h2>
      <p class="cart-item__category">{{ item.product.category }} · {{ item.product.brand }}</p>
      <p class="cart-item__price">{{ item.product.price.toFixed(2) }}€</p>
      <div class="cart-item__qty">
        <label class="cart-item__qty-label">
          Cantidad:
          <input
            type="number"
            v-model.number="localQuantity"
            @change="updateQty"
            min="1"
            class="cart-item__qty-input"
          />
        </label>
      </div>
      <p class="cart-item__subtotal">
        Subtotal: {{ (item.product.price * localQuantity).toFixed(2) }}€
      </p>
    </div>
    <button class="cart-btn-remove" @click="removeItem">Eliminar</button>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';


interface Product {
  imageUrl: string;
  name: string;
  category: string;
  brand: string;
  price: number;
}

interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
}


const props = defineProps<{
  item: CartItem;
  quantity: number;
}>();


const emit = defineEmits<{
  (e: 'update-quantity', productId: number, quantity: number): void;
  (e: 'remove-item', productId: number): void;
}>();

const localQuantity = ref(props.quantity);

watch(
  () => props.quantity,
  (newVal) => {
    localQuantity.value = newVal;
  }
);

function updateQty() {
  if (localQuantity.value > 0) {
    emit('update-quantity', props.item.productId, localQuantity.value);
  }
}

function removeItem() {
  emit('remove-item', props.item.productId);
}
</script>