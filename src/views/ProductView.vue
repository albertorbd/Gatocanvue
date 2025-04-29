<template>
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        <li v-for="producto in productos" :key="producto.id">
          <img :src="producto.imageUrl" alt="Imagen del producto" />
          <h2>{{ producto.name }}</h2>
          <p><strong>Precio:</strong> ${{ producto.price.toFixed(2) }}</p>
          <p><strong>Categoría:</strong> {{ producto.category }}</p>
          <p><strong>Marca:</strong> {{ producto.brand }}</p>
          <p><strong>Stock:</strong> {{ producto.stock }}</p>
          <p>{{ producto.description }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import api from '@/services/api';
  import type { Product } from '@/core/product';
  
  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Productos',
    data() {
      return {
        productos: [] as Product[],
      };
    },
    mounted() {
      this.obtenerProductos();
    },
    methods: {
      async obtenerProductos() {
        try {
          const response = await api.get<Product[]>('/Product');
          this.productos = response.data;
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      },
    },
  });
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
  }
  
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 8px;
  }
  </style>