<template>
  <div class="welcome-page">
    <div class="welcome-card">
      <h1 class="welcome-title">¡Hola, {{ userName }}!</h1>
      <p class="welcome-text">Ya has iniciado sesión. ¿Deseas desconectarte??</p>
      <button class="welcome-button" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const userName = authStore.user?.name || 'Usuario';

function logout() {
  authStore.logout();
  router.push('/');
}
</script>

<style scoped>


</style>