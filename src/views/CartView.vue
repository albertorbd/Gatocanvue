<template>
    <div class="cart-view">
      <h1>Mi Carrito</h1>
  
      <div v-if="loading" class="loading">Cargando carrito…</div>
  
      <div v-else>
        <ul v-if="cart && cart.items.length" class="cart-list">
          <li v-for="item in cart.items" :key="item.productId" class="cart-item">
            <img :src="item.product.imageUrl" alt="Imagen del producto" class="cart-item__img"/>
            <div class="cart-item__details">
              <h2 class="cart-item__name">{{ item.product.name }}</h2>
              <p class="cart-item__price">Precio unitario: ${{ item.product.price.toFixed(2) }}</p>
              <div class="cart-item__qty">
                <label>
                  Cantidad:
                  <input
                    type="number"
                    v-model.number="quantities[item.productId]"
                    @change="updateQty(item.productId)"
                    min="1"
                  />
                </label>
              </div>
              <p class="cart-item__subtotal">
                Subtotal: ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
            </div>
            <button class="btn btn-remove" @click="removeItem(item.productId)">
              Eliminar
            </button>
          </li>
        </ul>
  
        <div v-else class="empty-cart">
          Tu carrito está vacío.
        </div>
  
        <div v-if="cart && cart.items.length" class="cart-summary">
          <p><strong>Total:</strong> ${{ total.toFixed(2) }}</p>
          <button class="btn btn-clear" @click="clearCart">
            Vaciar Carrito
          </button>

    <button class="btn btn-purchase" @click="buyCart">
     Comprar carrito
     </button>
         
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import type { CartItem } from '@/core/cart';
  import type { CartUpdateDto } from '@/core/cart';
  import { useTransactionStore } from '@/stores/transaction.ts';
  
  const cartStore = useCartStore();
  const loading = ref(true);
  const txStore   = useTransactionStore();
  const buying     = ref(false);
  
  const quantities = ref<Record<number, number>>({});
  
  const cart = computed(() => cartStore.cart);
  const total = computed(() => {
    if (!cart.value) return 0;
    return cart.value.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
  });
  
  
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
  const newQty = quantities.value[productId];
  if (newQty == null) return;
  const dto: CartUpdateDto = { productId, quantity: newQty };
  await cartStore.updateQuantity(dto);
}
  
  // Llama al store para eliminar un ítem
  async function removeItem(productId: number) {
    await cartStore.removeFromCart(productId);
    delete quantities.value[productId];
  }
  
  // Llama al store para vaciar el carrito
  async function clearCart() {
    await cartStore.clearCart();
    quantities.value = {};
  }

  async function buyCart() {
  if (!cart.value || !cart.value.items.length) return;

  buying.value = true;
  try {
    
    const purchases = cart.value.items.map(i => ({
      userId:        cartStore.cart!.userId,
      productId:     i.productId,
      quantity:      i.quantity,
      paymentMethod: 'App'
    }));

    
    for (const p of purchases) {
      await txStore.purchase(p);
    }

    
    await cartStore.clearCart();

   
    quantities.value = {};

   
    alert('Compra realizada con éxito');
  } catch (err) {
    console.error('Error comprando carrito:', err);
    alert('Error al procesar la compra');
  } finally {
    buying.value = false;
  }
}
  </script>
  
  <style scoped>
  .cart-view {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .loading,
  .empty-cart {
    text-align: center;
    font-style: italic;
    color: #666;
  }
  
  .cart-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 1rem 0;
  }
  
  .cart-item__img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 4px;
  }
  
  .cart-item__details {
    flex: 1;
  }
  
  .cart-item__name {
    margin: 0 0 0.5rem;
  }
  
  .cart-item__price,
  .cart-item__subtotal {
    margin: 0.25rem 0;
  }
  
  .cart-item__qty input {
    width: 60px;
    margin-left: 0.5rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-remove {
    background: #e53e3e;
    color: white;
    margin-left: 1rem;
  }
  
  .btn-remove:hover {
    background: #c53030;
  }
  
  .cart-summary {
    text-align: right;
    margin-top: 1rem;
  }
  
  .btn-clear {
    background: #718096;
    color: white;
  }
  
  .btn-clear:hover {
    background: #4a5568;
  }

  .btn-purchase {
  margin-left: 0.5rem;
  background-color: #3182ce;
  color: white;
}
.btn-purchase:hover {
  background-color: #2b6cb0;
}
  </style>