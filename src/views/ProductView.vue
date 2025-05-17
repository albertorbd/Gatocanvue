<template>
  <div class="product-container">
    <h1 class="product-title">Nuestros Productos</h1>

    <div class="product-content">
      <!-- Filtros -->
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
          <li
            v-for="producto in productStore.products"
            :key="producto.id"
            class="product-item"
          >
            
            <div class="image-container">
              <img :src="producto.imageUrl" alt="Imagen del producto" />
            </div>

            
            <div class="product-info">
              <h2 class="product-name">{{ producto.name }}</h2>
              <div class="product-tags">
                <v-chip small outlined class="mr-1">{{ producto.category }}</v-chip>
                <v-chip small outlined>{{ producto.brand }}</v-chip>
              </div>
              <p class="product-desc">{{ producto.description }}</p>
            </div>

           
            <div class="product-footer">
              <span class="product-price">{{ producto.price.toFixed(2) }}€</span>
              <div class="product-buttons">
                <button class="btn-add-cart" @click="addToCart(producto.id)">
                  Añadir al carrito
                </button>
                <button class="btn-view-more" @click="goToProduct(producto.id)">
                  Ver más
                </button>
              </div>
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
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

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

const goToProduct = (id: number) => {
  router.push({ name: 'ProductDetail', params: { id } });
};

onMounted(() => {
  productStore.resetFilters();
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


.product-list {
  width: 75%;
}

.product-ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}


.product-item {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  width: calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.product-item:hover {
  transform: translateY(-4px);
}

.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* contenido principal */
.product-info {
  padding: 16px;
  flex-grow: 1;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.product-tags {
  display: flex;
  margin-bottom: 8px;
}

.product-tags .v-chip {
  font-size: 0.75rem;
  height: 24px;
}

.product-desc {
  font-size: 0.9rem;
  color: #555;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* pie de tarjeta */
.product-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-weight: bold;
  color: #d82108;
}

.product-buttons button + button {
  margin-left: 8px;
}

/* estilos botones */
.btn-add-cart,
.btn-view-more {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-cart {
  background-color: #d82108;
  color: white;
}

.btn-add-cart:hover {
  background-color: #b71c1c;
}

.btn-view-more {
  background: transparent;
  color: #d82108;
  border: 1px solid #d82108;
}

.btn-view-more:hover {
  background-color: #fce4ec;
}
</style>