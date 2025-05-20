<template>
    <div class="admin">
      <h1>Zona Admin</h1>
      <UserList />
      <ProductCrud />
    </div>
  </template>
  
  <script setup lang="ts">
  import UserList from '@/components/Admin/UserList.vue';
  import ProductCrud from '@/components/Admin/ProductCrud.vue';
  </script>
  
  <style scoped>
  
  </style>