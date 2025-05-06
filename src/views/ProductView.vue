<template>
  <div>
    <h1>Lista de Productos</h1>
    <ul>
      <li v-for="producto in productos" :key="producto.id" class="product-item">
        <img :src="producto.imageUrl" alt="Imagen del producto" />
        <h2>{{ producto.name }}</h2>
        <p><strong>Precio:</strong> ${{ producto.price.toFixed(2) }}</p>
        <p><strong>Categoría:</strong> {{ producto.category }}</p>
        <p><strong>Marca:</strong> {{ producto.brand }}</p>
        <p><strong>Stock:</strong> {{ producto.stock }}</p>
        <p>{{ producto.description }}</p>
        <!-- Botón Añadir al carrito -->
        <button @click="addToCart(producto.id)" class="btn-add-cart">
          Añadir al carrito
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import type { Product } from '@/core/product';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/auth';

const productos = ref<Product[]>([]);
const cartStore = useCartStore();
const authStore = useAuthStore();

async function obtenerProductos() {
  try {
    const response = await api.get<Product[]>('/Product');
    productos.value = response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

async function addToCart(productId: number) {
  if (!authStore.user) {
    alert('Debes iniciar sesión para añadir productos al carrito.');
    return;
  }
  try {
    await cartStore.addToCart({ productId, quantity: 1 });
    // opcional: notificar al usuario
    alert('Producto añadido al carrito');
  } catch (e) {
    console.error('Error añadiendo al carrito:', e);
  }
}

onMounted(() => {
  obtenerProductos();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.product-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  position: relative;
}

.product-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.btn-add-cart {
  margin-top: 8px;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-cart:hover {
  background-color: #369870;
}
</style>