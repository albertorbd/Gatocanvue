<template>
    <div class="admin">
      <h1>Zona Admin</h1>
      <UserList />
      <ProductCrud />
    </div>
  </template>
  
  <script setup lang="ts">
  import UserList from '@/components/UserList.vue';
  import ProductCrud from '@/components/ProductCrud.vue';
  </script>
  
  <style scoped>
  .admin {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .admin h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #35495e;
  }
  </style>