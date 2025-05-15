<template>
  <div class="product-container">
    <h1 class="product-title">Nuestros Productos</h1>

    <div class="product-content">
     
      <aside class="filters">
        <input
          v-model="productStore.searchQuery"
          type="text"
          placeholder="Buscar productos..."
          class="search-bar"
        />

        <select v-model="productStore.selectedBrand" class="filter-select">
          <option value="">Todas las marcas</option>
          <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>

        <select v-model="productStore.selectedCategory" class="filter-select">
          <option value="">Todas las categorías</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <select v-model="productStore.priceOrder" class="filter-select">
          <option value="">Ordenar por precio</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </aside>

      
      <section class="product-list">
        <ul class="product-ul">
          <li v-for="producto in productStore.products" :key="producto.id" class="product-item">
            <div class="image-container">
              <img :src="producto.imageUrl" alt="Imagen del producto" />
            </div>
            <div class="product-info">
              <h2>{{ producto.name }}</h2>
              <p>{{ producto.description }}</p>
              <p><strong>Categoría:</strong> {{ producto.category }}</p>
              <p><strong>Marca:</strong> {{ producto.brand }}</p>
            </div>
            <div class="product-footer">
              <span class="product-price">€{{ producto.price.toFixed(2) }}</span>
              <button @click="addToCart(producto.id)" class="btn-add-cart">
                Añadir al carrito
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useProductStore } from '@/stores/productstore';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/auth';

const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const addToCart = async (productId: number) => {
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
};

onMounted(() => {
  productStore.fetchAllProducts();
});

watch(
  () => [
    productStore.searchQuery,
    productStore.selectedBrand,
    productStore.selectedCategory,
    productStore.priceOrder,
  ],
  () => {
    productStore.fetchAllProducts();
  }
);

const uniqueBrands = computed(() => {
  const brands = productStore.products.map((p) => p.brand);
  return Array.from(new Set(brands));
});

const uniqueCategories = computed(() => {
  const categories = productStore.products.map((p) => p.category);
  return Array.from(new Set(categories));
});
</script>

<style scoped>

.product-container {
  background-color: #f5f5f5; 
  padding: 20px;
}

.product-title {
  text-align: center;
  margin-bottom: 20px;
}


.product-content {
  display: flex;
}

.filters {
  width: 25%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-right: 20px;
}

.product-list {
  width: 75%;
}


.search-bar,
.filter-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-select {
  background-color: #ff4d4d; 
  color: white;
}


.product-ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px; 
  width: calc(33.333% - 20px); 
  min-height: 500px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.2s;
}

.image-container {
  width: 100%;
  height: 250px; 
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px; 
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details {
  flex-grow: 1;
  padding: 8px 0;
}

.product-info {
  flex-grow: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  text-align: right;
  font-weight: bold;
  padding-top: 8px; 
}

.btn-add-cart {
  padding: 0.5rem 1rem;
  background-color: #d82108;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-cart:hover {
  background-color: #000000;
}
</style>