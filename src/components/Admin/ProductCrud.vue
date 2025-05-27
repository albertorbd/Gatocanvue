<template>
    <div class="admin-product-crud">
      <h4 class="admin-product-gestion">Gestión de Productos</h4>

      <form @submit.prevent="submitForm" class="admin-product-form">
        <input v-model="form.name" placeholder="Nombre" required />
        <input v-model="form.description" placeholder="Descripción" required />
        <input v-model="form.longDescription" placeholder="Descripción larga" required />
        <input v-model.number="form.price" type="number" step="0.01"
         placeholder="Precio" required />
        <input v-model="form.category" placeholder="Categoría" required />
        <input v-model="form.brand" placeholder="Marca" required />
        <input v-model.number="form.stock" type="number" placeholder="Stock" required />
        <input v-model="form.imageUrl" placeholder="URL Imagen" required />
        <button type="submit" class="admin-submit-btn">
          {{ isEditing ? 'Actualizar Producto' : 'Crear Producto' }}
        </button>
        <button v-if="isEditing" type="button" class="admin-btn-cancel" @click="resetForm">
          Cancelar
        </button>
      </form>

     
      <ul class="admin-product-list">
        <li v-for="p in products" :key="p.id" class="admin-product-item">
          <div class="admin-product-info">
            <strong>{{ p.name }}</strong><br/>
            <p class="admin-product-price">{{ p.price.toFixed(2) }}€</p>
          </div>
          <div class="admin-product-actions">
            <button class="btn admin-edit-btn" @click="editProduct(p)">Editar</button>
            <button class="btn admin-btn-cancel" @click="removeProduct(p.id)">Borrar</button>
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
  
  
  const form = ref<Omit<Product, 'id'>>({
    name: '',
    description: '',
    longDescription: '',
    price: 0,
    category: '',
    brand: '',
    stock: 0,
    imageUrl: ''
  });
  const isEditing = ref(false);
  const editingId = ref<number | null>(null);
  
  
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
   await productStore.deleteProduct(id);
  products.value = productStore.products;
  }
  
  function resetForm() {
    form.value = { name: '', description: '', longDescription: '', price: 0, category: '', brand: '', stock: 0, imageUrl: '' };
    isEditing.value = false;
    editingId.value = null;
  }
  </script>
  
  <style scoped>
  </style>
