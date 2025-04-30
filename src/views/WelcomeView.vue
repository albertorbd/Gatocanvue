<template>
    <div class="bienvenida">
      <h1>¡Hola, {{ userEmail }}!</h1>
      <p>Ya has iniciado sesión. ¿Deseas cerrar la sesión?</p>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const userEmail = authStore.user?.email || 'Usuario';
  
  function logout() {
    authStore.logout();
    router.push('/');
  }
  </script>
  