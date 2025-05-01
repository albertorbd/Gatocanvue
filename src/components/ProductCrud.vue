<template>
    <div class="product-crud">
      <h2>Gestión de Productos</h2>

      <!-- Formulario de creación/edición -->
      <form @submit.prevent="submitForm" class="product-form">
        <input v-model="form.name" placeholder="Nombre" required />
        <input v-model="form.description" placeholder="Descripción" required />
        <input v-model.number="form.price" type="number" placeholder="Precio" required />
        <input v-model="form.category" placeholder="Categoría" required />
        <input v-model="form.brand" placeholder="Marca" required />
        <input v-model.number="form.stock" type="number" placeholder="Stock" required />
        <input v-model="form.imageUrl" placeholder="URL Imagen" required />
        <button type="submit" class="btn">
          {{ isEditing ? 'Actualizar Producto' : 'Crear Producto' }}
        </button>
        <button v-if="isEditing" type="button" class="btn btn-cancel" @click="resetForm">
          Cancelar
        </button>
      </form>

      <!-- Lista de productos -->
      <ul class="product-list">
        <li v-for="p in products" :key="p.id" class="product-item">
          <div class="product-info">
            <strong>{{ p.name }}</strong><br />
            ${{ p.price.toFixed(2) }}
          </div>
          <div class="product-actions">
            <button class="btn btn-edit" @click="editProduct(p)">Editar</button>
            <button class="btn btn-delete" @click="removeProduct(p.id)">Borrar</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '@/stores/productstore';
  import type { Product } from '@/core/product';
  
  const productStore = useProductStore();
  const products = ref<Product[]>([]);
  
  // Formulario reactivo
  const form = ref<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    stock: 0,
    imageUrl: ''
  });
  const isEditing = ref(false);
  const editingId = ref<number | null>(null);
  
  // Carga inicial de productos
  async function loadProducts() {
    await productStore.fetchAllProducts();
    products.value = productStore.products;
  }
  onMounted(loadProducts);
  
  async function submitForm() {
    if (isEditing.value && editingId.value !== null) {
      await productStore.updateProduct(editingId.value, form.value);
    } else {
      await productStore.createProduct(form.value);
    }
    await loadProducts();
    resetForm();
  }
  
  function editProduct(p: Product) {
    form.value = { ...p };
    editingId.value = p.id;
    isEditing.value = true;
  }
  
  async function removeProduct(id: number) {
    // El store ya refresca la lista tras eliminar, solo actualizamos el array local
    await productStore.deleteProduct(id);
    products.value = productStore.products;
  }
  
  function resetForm() {
    form.value = { name: '', description: '', price: 0, category: '', brand: '', stock: 0, imageUrl: '' };
    isEditing.value = false;
    editingId.value = null;
  }
  </script>
  
  <style scoped>
  .product-crud {
    margin-bottom: 2rem;
  }
  .product-crud h2 {
    margin-bottom: 1rem;
  }
  .product-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .product-form input {
    flex: 1 1 150px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    padding: 0.5rem 1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #369870;
  }
  .btn-cancel {
    background-color: #e53e3e;
  }
  .btn-cancel:hover {
    background-color: #c53030;
  }
  .product-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
  .product-actions button {
    margin-left: 0.5rem;
  }
  </style>
